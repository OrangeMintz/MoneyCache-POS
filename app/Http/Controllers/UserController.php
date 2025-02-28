<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'role' => 'required|string',
            'password' => 'required|string',
        ]);

        return response()->json([
            "message" => "This is store"
            ]);
    }

    public function show(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
        return response()->json([
            "message" => "This is store"
            ]);
    }

    public function destroy(string $id)
    {
        // Soft delete
    }

    public function softDelete(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'User Successfully'
            ]);
        }else{
            return redirect()->back()->with('success', 'User Successfully');
        }
    }
}
