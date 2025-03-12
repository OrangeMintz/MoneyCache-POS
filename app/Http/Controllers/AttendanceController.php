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

    public function retrieve() {

        $attendance = Attendance::with('user')->get();

        return response()->json([
            "status" => 1,
            "attendance" => $attendance,
        ]);
    }

    public function timeIn(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!'], 400);
        }

        $now = now();
        $login = today()->setTime(8, 0);

        // Check if the user has already clocked in today
        $alreadyClockedIn = Attendance::where('user_id', $user->id)
            ->whereDate('timeIn', today())
            ->exists();

        if ($alreadyClockedIn) {
            $message = 'You have already clocked in today!';
            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 400);
            }

            return redirect()->back()->with([
                'message' => $message,
                'alert-type' => 'error',
            ]);
        }

        // Determine status
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


    public function timeOut(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!'], 400);
        }

        $now = now();

        // Get the latest attendance record for today
        $attendance = Attendance::where('user_id', $user->id)
            ->whereDate('timeIn', today())
            ->whereNull('timeOut') // Ensure it's not already timed out
            ->latest()
            ->first();

        if (!$attendance) {
            $message = 'You have not clocked in today or have already clocked out!';
            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 400);
            }

            return redirect()->back()->with([
                'message' => $message,
                'alert-type' => 'error',
            ]);
        }

        // Convert timeIn to Carbon instance
        $timeIn = \Carbon\Carbon::parse($attendance->timeIn);

        // Calculate total hours
        $totalHours = $timeIn->diffInHours($now);
        $totalRate = $totalHours * $user->rate;

        // Update the attendance record
        $attendance->update([
            'timeOut' => $now,
            'totalHours' => $totalHours,
            'totalRate' => $totalRate,
        ]);

        $message = 'Clocked Out Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }

        return redirect()->back()->with([
            'message' => $message,
            'alert-type' => 'success',
        ]);
    }

}
