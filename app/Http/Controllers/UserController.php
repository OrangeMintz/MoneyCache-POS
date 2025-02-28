<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();

        return view('pages.users', compact('users'));
    }

    public function store(Request $request)
    {
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
