<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('pages.transactions');
    }

    // public function test(Request $request)
    // {
    //     if ($request->ajax()) {
    //         $transactions = Transactions::get();
    //         return response()->json(['data' => $transactions]);
    //     }

    //     return view('pages.test');
    // }

    public function list(Request $request)
    {
        if ($request->ajax()) {
            $transactions = Transactions::with('cashier:id,name')->get();
            return response()->json(['data' => $transactions]);
        }
        return view('pages.transactions-list');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cashier' => 'required|exists:users,id',
            'time' => 'required|string|in:AM,MID,PM',
            'cash' => 'numeric|nullable|min:0',
            'check' => 'numeric|nullable|min:0',
            'bpi_ccard' => 'numeric|nullable|min:0',
            'bpi_dcard' => 'numeric|nullable|min:0',
            'metro_ccard' => 'numeric|nullable|min:0',
            'metro_dcard' => 'numeric|nullable|min:0',
            'paymaya' => 'numeric|nullable|min:0',
            'aub_ccard' => 'numeric|nullable|min:0',
            'gcash' => 'numeric|nullable|min:0',
            'food_panda' => 'numeric|nullable|min:0',
            'streetby' => 'numeric|nullable|min:0',
            'grabfood' => 'numeric|nullable|min:0',
            'gc_claimed_others' => 'numeric|nullable|min:0',
            'gc_claimed_own' => 'numeric|nullable|min:0',
            'mm_head' => 'string|nullable',
            'mm_commissary' => 'string|nullable',
            'mm_rm' => 'numeric|nullable|min:0',
            'mm_dm' => 'numeric|nullable|min:0',
            'mm_km' => 'numeric|nullable|min:0',
            'food_charge' => 'numeric|nullable|min:0',
            'z_reading_pos' => 'numeric|nullable|min:0',
        ]);


        // Compute subtotals
        $subtotal_trade =
            ($validated['cash'] ?? 0) + ($validated['check'] ?? 0) +
            ($validated['bpi_ccard'] ?? 0) + ($validated['bpi_dcard'] ?? 0) +
            ($validated['metro_ccard'] ?? 0) + ($validated['metro_dcard'] ?? 0) +
            ($validated['paymaya'] ?? 0) + ($validated['aub_ccard'] ?? 0) +
            ($validated['gcash'] ?? 0) + ($validated['food_panda'] ?? 0) +
            ($validated['streetby'] ?? 0) + ($validated['grabfood'] ?? 0) +
            ($validated['gc_claimed_others'] ?? 0) + ($validated['gc_claimed_own'] ?? 0);

        $subtotal_non_trade =
            ($validated['mm_rm'] ?? 0) + ($validated['mm_dm'] ?? 0) +
            ($validated['mm_km'] ?? 0) + ($validated['food_charge'] ?? 0);

        $grand_total = $subtotal_trade + $subtotal_non_trade;

        // Store transaction
        Transactions::create(array_merge($validated, [
            'sub_total_trade' => $subtotal_trade,
            'sub_total_non_trade' => $subtotal_non_trade,
            'grand_total' => $grand_total,
        ]));

        // return redirect()->back()->with('success', 'Transaction stored successfully.');
        return response()->json(['status' => 'success', 'message' => 'Transaction stored successfully.']);

    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function populateEdit($id)
    {
        $transaction = Transactions::findOrFail($id);
        return response()->json($transaction);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'cashier' => 'required|string',
            'time' => 'required|string',
            'cash' => 'numeric|nullable',
            'check' => 'numeric|nullable',
            'bpi_ccard' => 'numeric|nullable',
            'bpi_dcard' => 'numeric|nullable',
            'metro_ccard' => 'numeric|nullable',
            'metro_dcard' => 'numeric|nullable',
            'paymaya' => 'numeric|nullable',
            'aub_ccard' => 'numeric|nullable',
            'gcash' => 'numeric|nullable',
            'food_panda' => 'numeric|nullable',
            'streetby' => 'numeric|nullable',
            'grabfood' => 'numeric|nullable',
            'gc_claimed_others' => 'numeric|nullable',
            'gc_claimed_own' => 'numeric|nullable',
            'mm_head' => 'string|nullable',
            'mm_commissary' => 'string|nullable',
            'mm_rm' => 'numeric|nullable|min:0',
            'mm_dm' => 'numeric|nullable|min:0',
            'mm_km' => 'numeric|nullable|min:0',
            'food_charge' => 'numeric|nullable|min:0',
            'z_reading_pos' => 'numeric|nullable|min:0',
        ]);


        // Compute subtotals
        $subtotal_trade =
            ($validated['cash'] ?? 0) + ($validated['check'] ?? 0) +
            ($validated['bpi_ccard'] ?? 0) + ($validated['bpi_dcard'] ?? 0) +
            ($validated['metro_ccard'] ?? 0) + ($validated['metro_dcard'] ?? 0) +
            ($validated['paymaya'] ?? 0) + ($validated['aub_ccard'] ?? 0) +
            ($validated['gcash'] ?? 0) + ($validated['food_panda'] ?? 0) +
            ($validated['streetby'] ?? 0) + ($validated['grabfood'] ?? 0) +
            ($validated['gc_claimed_others'] ?? 0) + ($validated['gc_claimed_own'] ?? 0);

        $subtotal_non_trade =
            ($validated['mm_rm'] ?? 0) + ($validated['mm_dm'] ?? 0) +
            ($validated['mm_km'] ?? 0) + ($validated['food_charge'] ?? 0);

        $grand_total = $subtotal_trade + $subtotal_non_trade;

        // Find and update transaction
        $transaction = Transactions::findOrFail($id);
        $transaction->update(array_merge($validated, [
            'sub_total_trade' => $subtotal_trade,
            'sub_total_non_trade' => $subtotal_non_trade,
            'grand_total' => $grand_total,
        ]));

        return response()->json(['status' => 'success', 'message' => 'Transaction updated successfully.']);
    }


    public function softDelete(string $id)
    {
        $transaction = Transactions::findOrFail($id);
        $transaction->delete();
        return redirect()->route('transactions')->with('success', 'Transaction deleted successfully.');
    }

    public function retrieve()
    {
        $transactions = Transactions::with('cashier')->get();

        return response()->json([
            "status" => 1,
            "transactions" => $transactions,
        ]);
    }

    public function getByDate(Request $request){
        $request->validate([
            "date" => "required|date|date_format:Y-m-d",
        ]);

        $date = $request->date;

        $transactions = Transactions::with('cashier')->whereDate('created_at', $date)->get();

        return response()->json([
            "status" => 1,
            "message" => "Here are the transactions for: ". $date,
            "transactions" => $transactions,
        ]);
    }

}
