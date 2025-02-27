<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;


class AdminController extends Controller
{
    public function index()
    {
        $users = User::all();

        return view('pages.users', compact('users'));
    }

    public function store()
    {

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
