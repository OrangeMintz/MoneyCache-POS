<?php

namespace App\Http\Controllers;

use App\Mail\CredentialsMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::all();
        if($request->wantsJson()){
            return response()->json([
                "status" => "success",
                "message" => "Here are your list of users my master admin!",
                "users" => $users,
            ]);
        }else{
            return view('pages.users', compact('users'));
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
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $message = 'This email is already taken or has invalid input.';

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
            'password' => Hash::make($plainPassword),
            'theme' => 'light',
        ]);

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
        return response()->json([
            "message" => "This is store"
            ]);
    }

    public function softDelete(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        $message = 'User Deleted Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }
        $notification = [
            'message' => $message,
            'alert-type' => 'success',
        ];
        return redirect()->back()->with($notification);
    }

}
