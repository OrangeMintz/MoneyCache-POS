<?php

use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\TransactionsGrossTotalController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CsvController;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // PROFILE MANAGEMENT
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // TRANSACTIONS
    Route::prefix('transaction')->group(function () {
        Route::get('/', [TransactionsController::class, 'index'])->name('transaction');
        Route::post('/', [TransactionsController::class, 'store'])->name('transaction.store');
        Route::put('/{id}', [TransactionsController::class, 'update'])->name('transaction.update');
        Route::get('/edit/{id}', [TransactionsController::class, 'populateEdit']);
        Route::get('/gross/{type}', [TransactionsGrossTotalController::class, 'gross']);
        Route::get('/net/{type}', [TransactionsGrossTotalController::class, 'net']);
    });
    Route::prefix('transactions')->group(function () {
        Route::get('/', [TransactionsController::class, 'list'])->name('transactions');
        Route::delete('/{id}', [TransactionsController::class, 'softDelete'])->name('transactions.softDelete');
    });

    Route::prefix('sheets')->group(function () {
    Route::get('/', [TransactionsController::class, 'export'])->name('transactions.sheet');
    Route::get('/export/csv', [CsvController::class, 'csv'])->name('transactions.sheet.csv');
    });

    Route::get('/pdf', [PDFController::class, 'pdf'])->name('pdf');
});


require __DIR__.'/auth.php';
