<?php

use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\LogsController;
use App\Http\Middleware\CheckRole;

// Lock Screen
use App\Http\Middleware\InactivityLock;
use App\Http\Controllers\LockController;


Route::get('/', function () {
    return view('welcome');
});
Route::middleware([InactivityLock::class])->group(function () {
    Route::post('/unlock', [LockController::class, 'unlock'])->middleware('auth');

    Route::middleware('auth')->group(function () {

        Route::prefix('dashboard')->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
            Route::get('/sales-data', [DashboardController::class, 'getSalesData']);
            Route::get('/logs/fetch', [DashboardController::class, 'fetchLogs'])->name('logs.fetch');
        });

        // PROFILE MANAGEMENT
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::middleware([CheckRole::class . ":admin,cashier"])->group(function () {

            // ATTENDANCE
            Route::prefix('attendance')->group(function () {
                Route::get('/', [AttendanceController::class, 'index'])->name('attendance.index');
                Route::post('/timeIn', [AttendanceController::class, 'timeIn'])->name("attendance.timeIn");
                Route::get('/timeOut', [AttendanceController::class, 'timeOut'])->name("attendance.timeOut");
            });

            // TRANSACTIONS
            Route::prefix('transaction')->group(function () {
                Route::get('/', [TransactionsController::class, 'index'])->name('transaction');
                Route::post('/', [TransactionsController::class, 'store'])->name('transaction.store');
                Route::put('/{id}', [TransactionsController::class, 'update'])->name('transaction.update');
                Route::get('/edit/{id}', [TransactionsController::class, 'populateEdit']);
            });

            Route::prefix('transactions')->group(function () {
                Route::get('/', [TransactionsController::class, 'list'])->name('transactions');
                Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('transactions.softDelete');
            });
        });

        Route::middleware([CheckRole::class . ":admin"])->group(function () {

            // USERS
            Route::prefix('user')->group(function () {
                Route::get('/', [UserController::class, 'index'])->name('admin.users');
                Route::put('/{id}', [UserController::class, 'update'])->name('admin.update');
                Route::delete('/{id}', [UserController::class, 'softDelete'])->name('admin.softDelete');
                Route::post('/{id}', [UserController::class, 'restoreUser'])->name('admin.restoreUser');
                Route::post('/', [UserController::class, 'store'])->name('admin.post');

            });

            Route::prefix('sheets')->group(function () {
                Route::get('/', [TransactionsController::class, 'export'])->name('transactions.sheet');
                Route::get('/export/csv', [CsvController::class, 'csv'])->name('transactions.sheet.csv');
                Route::get('/export/pdf', [PDFController::class, 'pdf'])->name('transactions.sheet.pdf');

            });
        });

    });
});


require __DIR__.'/auth.php';
