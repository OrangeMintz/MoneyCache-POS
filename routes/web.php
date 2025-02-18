<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

// Route::get('/login', function () {
//     return view('login');
// })->name('login');


Route::get('/register', function () {
    return view('register');
})->name('register');

Route::middleware("auth",)->group(function(){
    Route::get('/transaction', function () {
        return view('transaction');
    })->name('transaction');

Route::get('/transaction-list', function () {
    return view('transaction-list');
})->name('transaction-list');
});

// Route::get('/transaction', function () {
//     return view('transaction');
// });
