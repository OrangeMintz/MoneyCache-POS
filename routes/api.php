<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     $user = Auth::user();
//     return $user;
// })->middleware('auth:api');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post("register", [AuthController::class,"register"]);
Route::post('login', [AuthController::class, 'login']);

