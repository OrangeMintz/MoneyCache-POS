<?php

namespace App\Http\Controllers;

use App\Mail\CredentialsMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all(); // Fetch all active users
        $deletedUsers = User::onlyTrashed()->get(); // Fetch only soft-deleted users

        if ($request->wantsJson()) {
            return response()->json([
                "status" => "success",
                "message" => "Here are your list of users, my master admin!",
                "users" => $users,
                "deleted_users" => $deletedUsers, // Include soft-deleted users in the JSON response
            ]);
        } else {
            return view('pages.users', compact('users', 'deletedUsers')); // Pass both active and deleted users to the view
        }
    }

    //CREATE USERS
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'role' => 'required|in:admin,cashier',
                'rate' => 'required|integer|min:0',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $message = 'This email is already taken';

            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message, 'errors' => $e->errors()], 422);
            }

            return redirect()->back()->with([
                'message' => $message,
                'alert-type' => 'error',
            ])->withInput();
        }

        $plainPassword = Str::random(10);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'rate' => $validated['rate'],
            'password' => Hash::make($plainPassword),
            'theme' => 'light',
        ]);

        // Log the action
        $userId = auth()->id(); // Get the currently authenticated admin
        (new LogsController)->storeUserLog($userId, $user->id, 'add');

        // MUST BE FIRST BEFORE THE SUCCESS MESSAGE -> DON'T TOUCH
        Mail::to($validated['email'])->send(new CredentialsMail($user, $plainPassword));

        $message = 'User Registered Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 201);
        }

        return redirect()->back()->with([
            'message' => $message,
            'alert-type' => 'success',
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|in:admin,cashier',
            'rate' => 'required',
            'password' => ['nullable', Rules\Password::defaults()],

        ]);

        Log::info("Validated: ",$validated);

        $existingUser = User::where('email', $validated['email'])
            ->where('id', '!=', $id)
            ->exists();

        if ($existingUser) {
            $message = 'This email is already taken';
            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 422);
            }
            return redirect()->back()->with(['message' => $message, 'alert-type' => 'error']);
        }

        $user = User::findOrFail($id);
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'rate' => $validated['rate'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        $userId = auth()->id(); // Get the currently authenticated admin
        (new LogsController)->storeUserLog($userId, $id, 'update');

        $message = 'User updated successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message]);
        }
        return redirect()->back()->with(['message' => $message, 'alert-type' => 'success']);
    }

    public function softDelete(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        $userId = auth()->id();
        (new LogsController)->storeUserLog($userId, $id, 'delete');

        $message = 'User Deleted Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }
        $notification = ['message' => $message,'alert-type' => 'success',];
        return redirect()->back()->with($notification);
    }

    public function restoreUser(Request $request, string $id)
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();
        $userId = auth()->id();
        (new LogsController)->storeUserLog($userId, $id, 'restore');

        $message = 'User Restored Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }
        $notification = ['message' => $message, 'alert-type' => 'success'];
        return redirect()->back()->with($notification);
    }
}
