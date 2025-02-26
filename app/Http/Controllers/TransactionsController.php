<?php

namespace App\Http\Controllers;

use App\Models\Transactions;
use Carbon\Carbon;
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

        // Check if a transaction already exists for the same user, time, and day
        $existingTransaction = Transactions::where('cashier', $validated['cashier'])
            ->where('time', $validated['time'])
            ->whereDate('created_at', now()->toDateString())
            ->exists();

        if ($existingTransaction) {
            return response()->json(['status' => 'error', 'message' => 'A transaction for this user and time already exists today.'], 422);
        }

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

        $notification = array ( //toaster notif when updated
            'message' => 'Added Successfully',
            'alert-type' => 'success',
        );

        //redirects to transactions-list
        return redirect()->route('transactions')->with($notification);
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
            'cashier' => 'string|nullable',
            'time' => 'string|in:AM,MID,PM',
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

        // Find the existing transaction
        $transaction = Transactions::findOrFail($id);

        // Check if another transaction exists with the same user, time, and date (excluding the current one)
        $existingTransaction = Transactions::where('cashier', $validated['cashier'])
            ->where('time', $validated['time'])
            ->whereDate('created_at', $transaction->created_at->toDateString())
            ->where('id', '!=', $id) // Exclude the current transaction being updated
            ->exists();

        if ($existingTransaction) {
            return response()->json(['status' => 'error', 'message' => 'Another transaction for this user with the same date already exists.'], 422);
        }

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

        // Update transaction
        $transaction->update(array_merge($validated, [
            'sub_total_trade' => $subtotal_trade,
            'sub_total_non_trade' => $subtotal_non_trade,
            'grand_total' => $grand_total,
        ]));

        $notification = array ( //toaster notif when updated
            'message' => 'Updated Successfully',
            'alert-type' => 'success',
        );

        return redirect()->back()->with($notification);

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

    public function export()
    {
        return view('pages.transactions-export');
    }

    // public function export($date)
    // {
    //     // Convert date from MM-DD-YYYY to YYYY-MM-DD format for database query
    //     $formattedDate = Carbon::createFromFormat('m-d-Y', $date)->format('Y-m-d');

    //     // Fetch transactions for that date
    //     $transactions = Transactions::whereDate('created_at', $formattedDate)->get();

    //     // Return as JSON
    //     // return response()->json($transactions);
    //     // return view('pages.transactions');
    //     return view('pages.transactions-export', compact('transactions'));
    // }
}
