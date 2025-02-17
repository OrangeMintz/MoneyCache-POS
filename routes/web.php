<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
