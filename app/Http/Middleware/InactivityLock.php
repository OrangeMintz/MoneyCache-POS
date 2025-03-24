<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class InactivityLock
{
    public function handle(Request $request, Closure $next)
    {
        $timeout = 5 * 60; // 5 minutes

        // Allow /lock and /unlock routes to be accessed freely
        if ($request->is('lock') || $request->is('unlock')) {
            return $next($request);
        }

        // Check inactivity and lock session
        if (Session::has('last_activity') && time() - Session::get('last_activity') > $timeout) {
            Session::put('locked', true);
        }

        Session::put('last_activity', time());

        // If locked, prevent access to other pages
        // if (Session::get('locked')) {
        //     return redirect('/lock');
        // }

        return $next($request);
    }


}
