<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LogsController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\LockController;
use App\Http\Middleware\CheckRole;

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/unlock', [LockController::class, 'unlock']);
    Route::put('/password', [PasswordController::class, 'update']);

    // Shared routes for admin and cashier
    Route::middleware([CheckRole::class . ":admin,cashier"])->group(function () {

        Route::prefix('transaction')->group(function () {
            Route::post('/', [TransactionsController::class, 'store'])->name('api.transaction.store');
            Route::put('/{id}', [TransactionsController::class, 'update'])->name('api.transaction.update');
            Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('api.transactions.softDelete');
        });

        Route::prefix('transactions')->group(function () {
            Route::get('/', [TransactionsController::class, 'retrieve']);
            Route::get('/totals', [TransactionsGrossTotalController::class, 'getOverallGrossNet']);
        });

        Route::prefix('logs')->group(function () {
            Route::get('/', [LogsController::class, 'index']);
            Route::get('/test', [LogsController::class, 'test']);
        });

        Route::prefix('dashboard')->group(function () {
            Route::post('/', [DashboardController::class, 'dashboardApi']);
        });

        Route::prefix('attendance')->group(function () {
            Route::get('/', [AttendanceController::class, 'retrieve']);
            Route::post('/timein', [AttendanceController::class, 'timeIn']);
            Route::get('/timeout', [AttendanceController::class, 'timeOut']);
        });
    });

    // Exclusive routes for admin only
    Route::middleware([CheckRole::class . ":admin"])->group(function () {

        Route::prefix('transactions')->group(function () {
            Route::get('/gross/{type}', [TransactionsGrossTotalController::class, 'gross']);
            Route::get('/net/{type}', [TransactionsGrossTotalController::class, 'net']);
            Route::get('/gross-all', [TransactionsGrossTotalController::class, 'grossAll']);
            Route::get('/net-all', [TransactionsGrossTotalController::class, 'netAll']);
            Route::post('/get-by-date', [TransactionsController::class, 'getByDate']);
            Route::post('/get-by-date/totals', [TransactionsGrossTotalController::class, 'getGrossNetByDate']);
            Route::post('/csv', [CsvController::class, 'csv']);
            Route::get('/pdf', [PDFController::class, 'pdf']);
        });

        // User route for admin
        Route::prefix('users')->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::post('/', [UserController::class, 'store']);
            Route::put('/{id}', [UserController::class, 'update']);
            Route::post('/{id}', [UserController::class, 'restoreUser']);
            Route::delete('/{id}', [UserController::class, 'softDelete']);
        });
    });


});



