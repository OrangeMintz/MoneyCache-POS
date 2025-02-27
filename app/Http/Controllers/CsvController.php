<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Config;

class CsvController extends Controller
{
    public function csv(Request $request){

        $request->validate([
            "date" => "required|date"
        ]);

        $date = $request->input('date');

        $transactions = Transactions::whereDate('created_at', $date)->get();
        $fees = Config::get('transactions.fees');

        // headers
        $csvHeader = ['Particulars', 'AM', 'MID', 'PM', 'Gross Total', 'Net Total'];
        $csvData = [];

        $particulars = array_keys($fees);
        foreach ($particulars as $particular) {
            $amValues = $transactions->where('time', 'AM')->pluck($particular)->toArray();
            $midValues = $transactions->where('time', 'MID')->pluck($particular)->toArray();
            $pmValues = $transactions->where('time', 'PM')->pluck($particular)->toArray();

            // Extract numeric values for summation
            $amNumeric = array_sum(array_filter($amValues, 'is_numeric')) ?: '';
            $midNumeric = array_sum(array_filter($midValues, 'is_numeric')) ?: '';
            $pmNumeric = array_sum(array_filter($pmValues, 'is_numeric')) ?: '';

            // Extract text values separately
            $amText = implode(', ', array_filter($amValues, fn($v) => !is_numeric($v)));
            $midText = implode(', ', array_filter($midValues, fn($v) => !is_numeric($v)));
            $pmText = implode(', ', array_filter($pmValues, fn($v) => !is_numeric($v)));

            // Preserve text values if they exist
            $am = $amText ?: $amNumeric;
            $mid = $midText ?: $midNumeric;
            $pm = $pmText ?: $pmNumeric;

            // Compute totals only for numeric values
            $grossTotal = ($amNumeric ?: 0) + ($midNumeric ?: 0) + ($pmNumeric ?: 0);
            $netTotal = $grossTotal * (1 - ($fees[$particular] / 100));

    $csvData[] = [$particular, $am, $mid, $pm, $grossTotal ?: '', $netTotal ?: ''];
        }

        $fileName = "transactions_" . $date . ".csv";
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
