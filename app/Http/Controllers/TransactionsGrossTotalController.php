<?php

namespace App\Http\Controllers;

use App\Models\TransactionsGrossTotal;
use App\Models\Transactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class TransactionsGrossTotalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionsGrossTotal $transactionsGrossTotal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransactionsGrossTotal $transactionsGrossTotal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransactionsGrossTotal $transactionsGrossTotal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionsGrossTotal $transactionsGrossTotal)
    {
        //
    }

    public function gross($type)
    {
        $particulars = Config::get('transactions.valid_columns');

        if(!in_array($type, $particulars)){
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
}
