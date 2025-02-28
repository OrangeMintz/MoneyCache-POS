<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return response()->json([
            "message" => "This is store"
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
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
                'message' => 'Transaction deleted successfully'
            ]);
        }else{
            return redirect()->back()->with('success', 'Transaction deleted successfully.');
        }
    }
}
