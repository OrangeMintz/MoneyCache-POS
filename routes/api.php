<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\SalesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post("register", [AuthController::class,"register"]);
// Route::post("login", [AuthController::class,"login"]);

Route::get('login', [AuthController::class, 'loginUI'])->name('login');

Route::post('login', [AuthController::class, 'login']);


Route::middleware("auth:api",)->group(function(){
    Route::apiResource("sales", SalesController::class);
});

