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

    public function update()
    {

    }

    public function softDelete(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        $message = 'User deleted successfully';
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
