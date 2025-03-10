<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\User;
use Illuminate\Http\Request;

class LogsController extends Controller
{

    public function storeUserLog($userId, $newUserId)
    {
        $admin = User::find($userId); // Get the admin user
        $adminName = $admin ? $admin->name : 'null'; // Fallback if user not found

        Logs::create([
            'user_id' => $userId, // Admin who created the user
            'transaction_id' => null, // No transaction involved
            'activity_user_id' => $newUserId, // The user that was created
            'type' => 'user',
            'category' => 'add',
            'message' => "{$adminName} added a new user",
            'total_hours' => null, // Not applicable
        ]);
    }
}
