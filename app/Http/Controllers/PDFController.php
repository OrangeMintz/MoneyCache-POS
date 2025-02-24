<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Barryvdh\DomPDF\Facade\Pdf;



class PDFController extends Controller
{
    public function pdf() {
        $pdf = Pdf::loadView('pdf');
        return $pdf->stream('transaction.pdf');
    }
}
