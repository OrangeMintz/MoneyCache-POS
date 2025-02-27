<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;
use App\Http\Middleware\CheckRole;

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes for admin
    Route::middleware([CheckRole::class . ":admin"])->group(function () {

        Route::prefix('transaction')->group(function () {
            Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
            Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
            Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('api.transactions.softDelete');
        });

        Route::prefix('transactions')->group(function () {
            Route::get('/', [TransactionsController::class, 'retrieve']);
            Route::get('/gross/{type}', [TransactionsGrossTotalController::class, 'gross']);
            Route::get('/net/{type}', [TransactionsGrossTotalController::class, 'net']);
            Route::get('/gross-all', [TransactionsGrossTotalController::class, 'grossAll']);
            Route::get('/net-all', [TransactionsGrossTotalController::class, 'netAll']);
            Route::post('/get-by-date', [TransactionsController::class, 'getByDate']);
            Route::post('/get-by-date/totals', [TransactionsGrossTotalController::class, 'getGrossNetByDate']);
            Route::post('/csv', [CsvController::class, 'csv']);
        });
    });

    Route::middleware([CheckRole::class . ":cashier"])->group(function () {

        Route::prefix('transaction')->group(function () {
            Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
            Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
            Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('api.transactions.softDelete');
        });

        Route::prefix('transactions')->group(function () {
            Route::get('/', [TransactionsController::class, 'retrievebyUser']);
        });
    });

    // Exclusive routes for admin
    // Route::middleware([CheckRole::class . ":admin"])->group(function () {

    //     Route::prefix('transactions')->group(function () {
    //         Route::post('/csv', [CsvController::class, 'csv']);
    //     });

    // });

    // Routes for cashier
    // Route::middleware([CheckRole::class . ":cashier"])->group(function () {

    //     Route::prefix('transactions')->group(function () {
    //         Route::get('/', [TransactionsController::class, 'retrieve']);
    //     });
        
    // });

    // Specific Transactions API
    // Route::prefix('transaction')->group(function () {
    // Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
    // Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
    // Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('api.transactions.softDelete');
    // });

    // Transactions/Totals API
    
});

// Route::post("register", [AuthController::class,"register"]);
// Route::post('login', [AuthController::class, 'login']);

