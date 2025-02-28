<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = Auth::user();
        $rolesArray = is_array($roles[0]) ? $roles[0] : $roles;

        if (!$user || !in_array($user->role, $rolesArray)) {
            $message = 'Unauthorized';
            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 403);
            }
            $notification = [
                'message' => $message,
                'alert-type' => 'error',
            ];
            return redirect()->back()->with($notification);
        }
        return $next($request);
    }
}