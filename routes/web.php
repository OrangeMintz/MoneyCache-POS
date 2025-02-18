<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

// Route::get('/login', function () {
//     return view('login');
// });


Route::get('/register', function () {
    return view('register');
});

Route::middleware("auth",)->group(function(){
    Route::get('/transaction', function () {
        return view('transaction');
    });
});

// Route::get('/transaction', function () {
//     return view('transaction');
// });
