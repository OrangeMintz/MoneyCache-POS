<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Transactions API
    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionsController::class, 'retrieve']);
        Route::get('/gross/{type}', [TransactionsGrossTotalController::class, 'gross']);
        
    });
});

Route::post("register", [AuthController::class,"register"]);
Route::post('login', [AuthController::class, 'login']);

Route::post('/transaction', [TransactionsController::class, 'store'])->name('transaction.store');


