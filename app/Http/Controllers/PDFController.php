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
    public function pdf() {

        $transactions = Transactions::with('cashier:id,name')->get();
    
        return view('pdf', compact('transactions'));
    }
}
