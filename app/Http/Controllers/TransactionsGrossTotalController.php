<?php

namespace App\Http\Controllers;

use App\Models\TransactionsGrossTotal;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransactionsGrossTotalController extends Controller
{

    public function checkParticular($type){
        $particulars = Config::get('transactions.valid_columns');

        if(!in_array($type, $particulars)){
            return null;
        }

        return $type;
    }

    public function gross($type)
    {
        $particular = $this->checkParticular($type);

        if(!$particular){
            return response()->json([
                    "status" => 0,
                    "message" => "Invalid Particular!"
                ]);
        }

        $sum = Transactions::sum($type);

        return response()->json([
            "status" => 1,
            "particular" => $type,
            "gross_total" => $sum
        ]);

    }

    public function net($type)
    {
        $particular = $this->checkParticular($type);

        if(!$particular){
            return response()->json([
                    "status" => 0,
                    "message" => "Invalid Particular!"
                ]);
        }

        $fees = Config::get('transactions.fees');
        $percent = $fees[$type];

        $compute = 1 - ($percent/100);

        $netSale = Transactions::sum(DB::raw("$type * $compute"));

        return response()->json([
            "status" => 1,
            "particular" => $type,
            "net_sale" => $netSale,
        ]);
    }

    public function grossAll()
    {
        $particulars = Config::get('transactions.valid_columns'); // Get all valid columns
        $grossTotals = [];

        foreach ($particulars as $particular) {
            // Group by date and get sum for each particular
            $safeColumn = "`$particular`";
            $grossTotals[$particular] = Transactions::select(
                    DB::raw("DATE(created_at) as date"),
                    DB::raw("SUM($safeColumn) as total")
                )
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();
        }

        return response()->json([
            "status" => 1,
            "gross_totals" => $grossTotals
        ]);
    }

    public function netAll()
    {
        $particulars = Config::get('transactions.valid_columns');
        $fees = Config::get('transactions.fees');
        $netSales = [];

        foreach ($particulars as $particular) {

            $safeColumn = "`$particular`";

            $percent = $fees[$particular];
            $compute = 1 - ($percent / 100);

            $netSales[$particular] = Transactions::select(
                    DB::raw("DATE(created_at) as date"),
                    DB::raw("SUM($safeColumn * $compute) as total")
                )
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();
        }

        return response()->json([
            "status" => 1,
            "net_sales" => $netSales
        ]);
    }

    public function getGrossNetByDate(Request $request)
{
    $request->validate([
        'date' => 'required|date'
    ]);

    $date = $request->input('date');
    $particulars = Config::get('transactions.valid_columns');
    $fees = Config::get('transactions.fees');
    $totals = [];

    foreach ($particulars as $particular) {
        $gross = Transactions::whereDate('created_at', $date)->sum($particular);
        $compute = isset($fees[$particular]) ? 1 - ($fees[$particular] / 100) : 1;
        $net = Transactions::whereDate('created_at', $date)->sum(DB::raw("`$particular` * $compute"));

        $totals[$particular] = [
            'gross' => round($gross, 2),
            'net' => round($net, 2)
        ];
    }

    return response()->json([
        "status" => 1,
        "date" => $date,
        "totals" => $totals
    ]);
}

public function getOverallGrossNet()
{
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

    return response()->json([
        "status" => 1,
        "gross" => round($grossTotal, 2),
        "net" => round($netTotal, 2),
    ]);
}






}
