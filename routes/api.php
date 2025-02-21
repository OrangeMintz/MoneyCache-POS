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
        Route::get('/net/{type}', [TransactionsGrossTotalController::class, 'net']);
        Route::get('/gross-all', [TransactionsGrossTotalController::class, 'grossAll']);
        Route::get('/net-all', [TransactionsGrossTotalController::class, 'netAll']);
    });
    Route::prefix('transaction')->group(function () {
    Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
    Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
    });

});

Route::post("register", [AuthController::class,"register"]);
Route::post('login', [AuthController::class, 'login']);




