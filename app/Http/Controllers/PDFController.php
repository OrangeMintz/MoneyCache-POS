<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\Transactions;
use App\Models\User;
use Illuminate\Support\Facades\Log;



class PDFController extends Controller
{
  public function pdf()
  {
      $am = Transactions::where('time', 'AM')->with('cashier')->first();
      $mid = Transactions::where('time', 'MID')->with('cashier')->first();
      $pm = Transactions::where('time', 'PM')->with('cashier')->first();
  
      $payment_methods = [
          'cash' => 'Cash',
          'check' => 'Check',
          'bpi_ccard' => 'BPI Credit Card',
          'bpi_dcard' => 'BPI Debit Card',
          'metro_ccard' => 'Metro Credit Card',
          'metro_dcard' => 'Metro Debit Card',
          'paymaya' => 'Pay Maya',
          'aub_ccard' => 'AUB Credit Card',
          'gcash' => 'GCash',
          'food_panda' => 'Food Panda',
          'streetby' => 'StreetBy',
          'grabfood' => 'Grab Food',
          'gc_claimed_others' => 'GC Claimed (Others)',
          'gc_claimed_own' => 'GC Claimed (Own)'
      ];
  
      $totals = [];
  
      foreach ($payment_methods as $key => $label) {
          $amValue = $am->$key ?? null;
          $midValue = $mid->$key ?? null;
          $pmValue = $pm->$key ?? null;
  
          $gross_total = ($amValue ?: 0) + ($midValue ?: 0) + ($pmValue ?: 0);
          $net_total = $gross_total ? $gross_total * 0.98 : null; // Leave blank if gross total is 0
  
          $totals[$key] = [
              'label' => $label,
              'am' => $amValue !== null ? number_format($amValue, 2) : '',
              'mid' => $midValue !== null ? number_format($midValue, 2) : '',
              'pm' => $pmValue !== null ? number_format($pmValue, 2) : '',
              'gross_total' => $gross_total ? number_format($gross_total, 2) : '',
              'net_total' => $net_total !== null ? number_format($net_total, 2) : '',
          ];
      }
  
      $sub_total_trade_am = array_sum(array_filter(array_column($totals, 'am'), 'is_numeric'));
      $sub_total_trade_mid = array_sum(array_filter(array_column($totals, 'mid'), 'is_numeric'));
      $sub_total_trade_pm = array_sum(array_filter(array_column($totals, 'pm'), 'is_numeric'));
      $sub_total_trade = $sub_total_trade_am + $sub_total_trade_mid + $sub_total_trade_pm;
      $sub_total_non_trade = ($am->mm_dm ?? 0) + ($mid->mm_dm ?? 0) + ($pm->mm_dm ?? 0);
      $grand_total = $sub_total_trade + $sub_total_non_trade;
  
      $data = [
          'am' => $am,
          'mid' => $mid,
          'pm' => $pm,
          'totals' => $totals,
          'sub_total_trade_am' => $sub_total_trade_am ? number_format($sub_total_trade_am, 2) : '',
          'sub_total_trade_mid' => $sub_total_trade_mid ? number_format($sub_total_trade_mid, 2) : '',
          'sub_total_trade_pm' => $sub_total_trade_pm ? number_format($sub_total_trade_pm, 2) : '',
          'sub_total_trade' => $sub_total_trade ? number_format($sub_total_trade, 2) : '',
          'sub_total_non_trade' => $sub_total_non_trade ? number_format($sub_total_non_trade, 2) : '',
          'grand_total' => $grand_total ? number_format($grand_total, 2) : '',
      ];
  
      $pdf = Pdf::loadView('pdf', $data);
      return $pdf->stream('transaction.pdf');
  }
  
  
}