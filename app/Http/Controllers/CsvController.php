<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Config;

class CsvController extends Controller
{
    public function csv(){

        // $request->validate([
        //     "date" => "required|date|date_format:Y-m-d"
        // ]);

        $date = "2025-02-20";

        $transactions = Transactions::whereDate('created_at', $date)->get();
        $fees = Config::get('transactions.fees');

        // headers
        $csvHeader = ['Particulars', 'AM', 'MID', 'PM', 'Gross Total', 'Net Total'];
        $csvData = [];

        $particulars = array_keys($fees);
        foreach ($particulars as $particular) {
            $am = $transactions->where('time', 'AM')->sum($particular);
            $mid = $transactions->where('time', 'MID')->sum($particular);
            $pm = $transactions->where('time', 'PM')->sum($particular);
    
            $grossTotal = $am + $mid + $pm;
            $netTotal = $grossTotal * (1 - ($fees[$particular] / 100)); // Deduct fee
    
            $csvData[] = [$particular, $am, $mid, $pm, $grossTotal, $netTotal];
        }
    

        $fileName = "transactions_" . now()->format('Y-m-d') . ".csv";
        $handle = fopen('php://output', 'w');
        ob_start();
    
        fputcsv($handle, $csvHeader);
    
        foreach ($csvData as $row) {
            fputcsv($handle, $row);
        }
    
        fclose($handle);
        $csvContent = ob_get_clean();
    
        return Response::make($csvContent, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=$fileName"
        ]);
    }
}
