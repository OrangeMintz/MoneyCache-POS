<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionsController;
use Illuminate\Support\Facades\Route;

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
    Route::get('/transaction', [TransactionsController::class, 'index'])->name('transaction');
    Route::get('/transactions', [TransactionsController::class, 'list'])->name('transactions');

});

    Route::post('/transaction', [TransactionsController::class, 'store'])->name('transaction.store');

require __DIR__.'/auth.php';
