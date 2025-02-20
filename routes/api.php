<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post("register", [AuthController::class,"register"]);
Route::post('login', [AuthController::class, 'login']);

Route::post('/transaction', [TransactionsController::class, 'store'])->name('transaction.store');


