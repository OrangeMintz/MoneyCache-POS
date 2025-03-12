<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use DateTime;
use DateTimeZone;

class AttendanceController extends Controller
{
    public function index() {

        return view('pages.attendance');
    }

    public function timeIn(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!'], 400);
        }
        $now = now();
        $login = today()->setTime(8, 0);
        $status = $now < $login ? 'Early' : ($now == $login ? 'On Time' : 'Late');

        Attendance::create([
            'user_id' => $user->id,
            'timeIn' => $now,
            'timeOut' => null,
            'totalHours' => null,
            'totalRate' => null,
            'status' => $status,
        ]);

        $message = 'Clocked In Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }

        return redirect()->back()->with([
            'message' => $message,
            'alert-type' => 'success',
        ]);
    }
}
