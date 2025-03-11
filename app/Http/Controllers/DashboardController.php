<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // If the user is an admin, fetch all logs; if a cashier, fetch only their logs
        $logs = Logs::with('user') // Load the related user details
            ->when($user->role === 'cashier', function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->latest()
            ->take(10) // Optional limit to recent logs
            ->get();

        return view('dashboard', compact('logs'));
    }
}
