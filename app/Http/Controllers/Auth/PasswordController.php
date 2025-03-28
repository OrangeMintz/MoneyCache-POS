<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Log;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */

     public function update(Request $request): JsonResponse|RedirectResponse
     {
         Log::info($request->all()); // Log request payload for debugging
     
         try {
             $validated = $request->validateWithBag('updatePassword', [
                 'current_password' => ['required', 'current_password'],
                 'password' => ['required', Password::defaults(), 'confirmed'],
             ]);
     
             $request->user()->update([
                 'password' => Hash::make($validated['password']),
             ]);
     
             return response()->json([
                 "status" => 1,
                 "message" => "Password reset successfully"
             ]);
     
         } catch (ValidationException $e) {
            Log::error('Validation failed', [
                'errors' => $e->errors()
            ]);
         }
     }

}
