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
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'role' => 'required|in:admin,cashier',
        ]);

        $plainPassword = Str::random(10);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($plainPassword),
            'theme' => 'light',
        ]);

        Mail::to($request->email)->send(new CredentialsMail($user, $plainPassword));
        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User Registered Successfully!'
            ]);
        }else{
            return redirect()->back()->with('success', 'User Registered Successfully!');
        }
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

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User Deleted Successfully'
            ]);
        }else{
            return redirect()->back()->with('success', 'User Deleted Successfully');
        }
    }

        // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|string',
    //         'email' => 'required|email',
    //         'role' => 'required|string',
    //         'password' => 'required|string',
    //     ]);

    //     return response()->json([
    //         "message" => "This is store"
    //         ]);
    // }
}
