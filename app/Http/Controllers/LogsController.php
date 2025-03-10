<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\User;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function index(Request $request){
        $logs = Logs::with(['user', 'activityUser', 'transaction'])->get();

        if ($request->wantsJson()) {
            return response()->json([
                "status" => 1,
                "logs" => $logs
            ]);
        }else{
            // Diri ibutang inyong logic for laravel
        }

    }

    public function storeUserLog($userId, $newUserId, $category)
    {
        $admin = User::find($userId); // Get the admin user
        $adminName = $admin ? $admin->name : 'null'; // Fallback if user not found

        Logs::create([
            'user_id' => $userId, // Admin who created the user
            'transaction_id' => null, // No transaction involved
            'activity_user_id' => $newUserId, // The user that was created
            'type' => 'user',
            'category' => $category,
            'message' => ($category === 'add') ? "added a new user" : $category . "d a new user",
            'total_hours' => null, // Not applicable
        ]);
    }

    public function storeTransactionLog($userId, $transactionId, $category)
    {
        $admin = User::find($userId);
        $adminName = $admin ? $admin->name : 'null';

        Logs::create([
            'user_id' => $userId,
            'transaction_id' => $transactionId,
            'activity_user_id' => null,
            'type' => 'transaction',
            'category' => $category,
            'message' => ($category === 'add') ? "added a new transaction" : $category . "d a transaction",
            'total_hours' => null,
        ]);
    }
}
