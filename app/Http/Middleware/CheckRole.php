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

        // Flatten roles array in case it's passed as a single string
        $rolesArray = is_array($roles[0]) ? $roles[0] : $roles;

        if (!$user || !in_array($user->role, $rolesArray)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}

