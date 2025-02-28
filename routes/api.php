<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;
use App\Http\Middleware\CheckRole;

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Shared routes for admin and cashier
    Route::middleware([CheckRole::class . ":admin,cashier"])->group(function () {

        Route::prefix('transaction')->group(function () {
            Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
            Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
            Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('api.transactions.softDelete');
        });
    
        Route::prefix('transactions')->group(function () {
            Route::get('/', [TransactionsController::class, 'retrieve']);
        });
    });
    
    // Exclusive routes for admin only
    Route::middleware([CheckRole::class . ":admin"])->group(function () {

        // Transaction routes for admin
        Route::prefix('transactions')->group(function () {
            Route::get('/gross/{type}', [TransactionsGrossTotalController::class, 'gross']);
            Route::get('/net/{type}', [TransactionsGrossTotalController::class, 'net']);
            Route::get('/gross-all', [TransactionsGrossTotalController::class, 'grossAll']);
            Route::get('/net-all', [TransactionsGrossTotalController::class, 'netAll']);
            Route::post('/get-by-date', [TransactionsController::class, 'getByDate']);
            Route::post('/get-by-date/totals', [TransactionsGrossTotalController::class, 'getGrossNetByDate']);
            Route::post('/csv', [CsvController::class, 'csv']);
        });

        // User route for admin
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::post('users/{id}', [UserController::class, 'store']);
        });

    });

    
});



