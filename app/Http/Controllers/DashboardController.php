<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Transactions;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;

class DashboardController extends Controller
{
    public function index()
    {
        $logs = $this->getRecentLogs(); // Use the new function
        $users = $this->getUsers();
        $transactions = $this->getTransactions();
        $grossTotal = $this->getTotalGrossSales();
        $netTotal = $this->getTotalNetSales();
        $grandTotal = $this->getGrandTotal();

        return view('dashboard', compact('logs', 'users', 'transactions', 'grossTotal', 'netTotal','grandTotal'));
    }

    public function getUsers(){

        return User::count();
    }

    public function getTransactions()
    {
        $user = Auth::user();

        return Transactions::when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('cashier_id', $user->id);
            })
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
    }

    public function getTotalGrossSales()
    {
        $user = Auth::user();

        return Transactions::when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('cashier_id', $user->id);
            })
            ->whereDate('created_at', now()->toDateString()) // Filter for today only
            ->sum('grand_total');
    }

    public function getTotalNetSales()
    {
        $user = Auth::user();

        // Get valid columns to sum, excluding subtotal and grand total fields
        $validColumns = array_diff(config('transactions.valid_columns'), [
            'sub_total_trade',
            'sub_total_non_trade',
            'grand_total'
        ]);

        // Fetch transactions for today, filtered by user role
        $transactions = Transactions::when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('cashier_id', $user->id);
            })
            ->whereDate('created_at', now()->toDateString()) // Filter for today only
            ->get();

        $totalNetSales = 0;

        // Loop through transactions
        foreach ($transactions as $transaction) {
            foreach ($validColumns as $column) {
                if (!is_null($transaction->$column)) {
                    // Get the fee percentage for the column
                    $fee = config("transactions.fees.$column", 0);
                    // Calculate net amount after fee deduction
                    $netAmount = (float) $transaction->$column - ((float) $transaction->$column * ((float) $fee / 100));
                    // Add to total net sales
                    $totalNetSales += $netAmount;
                }
            }
        }

        return $totalNetSales;
    }

    public function getRecentLogs()
    {
        $user = Auth::user();

        return Logs::with('user')
            ->when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->latest()
            ->take(10)
            ->get();
    }

    public function getAllLogs()
    {
        $user = Auth::user();

        return Logs::with('user')
            ->when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->latest()
            ->get();
    }


    public function getGrandTotal()
    {
        $user = Auth::user();

        return Transactions::when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('cashier_id', $user->id);
            })
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('grand_total'); // Get total sales for the month
    }

    public function getSalesData()
    {
        // Get current month
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Fetch sales data: sum grand_total per day for the current month
        $salesData = DB::table('transactions')
            ->selectRaw('DATE(created_at) as date, SUM(grand_total) as total')
            ->whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Format response
        $sales = $salesData->pluck('total')->toArray();
        $dates = $salesData->pluck('date')->map(fn($date) => Carbon::parse($date)->format('d F'))->toArray();

        return response()->json([
            'sales' => $sales,
            'dates' => $dates
        ]);
    }

    public function fetchLogs(Request $request)
    {
        $user = Auth::user();

        $logsQuery = Logs::with(['user', 'transaction', 'activityUser', 'attendance'])
            ->latest();

        if ($user->role === 'cashier') {
            $logsQuery->where('user_id', $user->id);
        }

        $logs = $logsQuery->get();

        return response()->json(['data' => $logs]);
    }

    public function dashboardApi(Request $request){

        $request->validate([
            'date' => 'required|date'
        ]);

        $transactions = $this->getTransactionsApi();
        $users = $this->getUsersApi();
        $totals = $this->getTotalsApi();
        $logs = $this->getLogsApi();
        $totalsToday = $this->getTotalsTodayApi($request->date);

        return response()->json([
                "transactions" => $transactions,
                "users" => $users,
                "totals" => $totals,
                "logs" => $logs,
                "totals_today" => $totalsToday,
            ]);
    }

    public function getTransactionsApi(){
        $transactions = '';
        $user = Auth::user();
        $userId = $user->id;

        if($user->role == 'admin'){
            $transactions = Transactions::with(['cashier' => function ($query) {
                $query->withTrashed(); // gets the cashier even if it is soft deleted
            }])->get();
        }else{
            $transactions = Transactions::with(['cashier' => function ($query) {
                $query->withTrashed();
            }])
            ->where('cashier_id', $userId)
            ->get();
        }

        return $transactions;
    }

    public function getUsersApi(){

        $user = Auth::user();
        $users = User::all(); // Fetch all active users
        $deletedUsers = User::onlyTrashed()->get(); // Fetch only soft-deleted users
        return [
            "active_users" => $user->role == 'admin' ? $users : null,
            "deleted_users" => $user->role == 'admin' ? $deletedUsers : null
        ];
    }

    public function getTotalsApi(){
        $user = Auth::user();
        $particulars = Config::get('transactions.valid_columns'); // Get all transaction columns
        $fees = Config::get('transactions.fees');
        $transactions = $user->role == 'admin' ? Transactions::with('cashier')->get() : Transactions::where('cashier_id', $user->id)->with('cashier')->get();

        $grossTotal = 0;
        $netTotal = 0;

        foreach ($particulars as $particular) {

            if (
                $particular !== 'sub_total_trade' &&
                $particular !== 'sub_total_non_trade' &&
                $particular !== 'grand_total'
            ) {
                $gross = $user->role == 'admin' ? Transactions::sum($particular) : Transactions::where('cashier_id', $user->id)->sum($particular);
                $compute = isset($fees[$particular]) ? 1 - ($fees[$particular] / 100) : 1;
                $net = $user->role == 'admin' ? Transactions::sum(DB::raw("`$particular` * $compute")) : Transactions::where('cashier_id', $user->id)->sum(DB::raw("`$particular` * $compute"));

                // Accumulate totals instead of overwriting
                $grossTotal += round($gross, 2);
                $netTotal += round($net, 2);
            }

        }

        return [
            "gross" => round($grossTotal, 2),
            "net" => round($netTotal, 2),
        ];
    }

    public function getTotalsTodayApi($date){
        // $date = $request->input('date');
        $particulars = Config::get('transactions.valid_columns');
        $fees = Config::get('transactions.fees');
        $grossToday = 0;
        $netToday = 0;
        $totalByParticular = [];

        foreach ($particulars as $particular) {
            $gross = Transactions::whereDate('created_at', $date)->sum($particular);
            $compute = isset($fees[$particular]) ? 1 - ($fees[$particular] / 100) : 1;
            $net = Transactions::whereDate('created_at', $date)->sum(DB::raw("`$particular` * $compute"));

            $totalByParticular[$particular] = [
                'gross' => round($gross, 2),
                'net' => round($net, 2)
            ];
        }

        foreach ($totalByParticular as $total) {
            $grossToday += $total['gross'];
            $netToday += $total['net'];
        }

        return [
            "date" => $date,
            "gross" => $grossToday,
            "net" => $netToday,
        ];
    }

    public function getLogsApi(){
        $user = Auth::user();

        // Logs for admin user
        $logs = $user->role == 'admin' ? Logs::with([
        'user' => function($query) {
            $query->withTrashed();
        },
         'activityUser' => function($query) {
            $query->withTrashed();
         },
         'transaction' => function($query) {
            $query->withTrashed()->with(['cashier' => function ($query) {
                $query->withTrashed(); // Include soft-deleted cashiers
            }]);
        }
         ])->get():

        // Logs for cashier user
        Logs::where('user_id', $user->id)->with(['user',
         'activityUser' => function($query) {
            $query->withTrashed();
         },
         'transaction' => function($query) {
            $query->withTrashed()->with(['cashier' => function ($query) {
                $query->withTrashed(); // Include soft-deleted cashiers
            }]);
        }
         ])->get();

        return $logs;
    }
}
