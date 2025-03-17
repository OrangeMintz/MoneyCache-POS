<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Transactions;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

        $logsQuery = Logs::with(['user', 'transaction', 'activityUser'])
            ->latest();

        if ($user->role === 'cashier') {
            $logsQuery->where('user_id', $user->id);
        }

        $logs = $logsQuery->get();

        return response()->json(['data' => $logs]);
    }
}
