<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use App\Events\MyEvent;
use DateTime;
use DateTimeZone;

class AttendanceController extends Controller
{
    public function index(Request $request) {
        $attendance = $this->retrieve($request);
        return view('pages.attendance', compact('attendance'));
    }

    public function retrieve(Request $request) {
        $user = Auth::user();

        $attendance = $user->role == 'admin'
            ? Attendance::with('user')->get()
            : Attendance::where('user_id', $user->id)->with('user')->get();

        if ($request->wantsJson()) {
            return response()->json([
                "status" => 1,
                "attendance" => $attendance,
            ]);
        }

        return $attendance; // Return the collection for use in `compact()`
    }

    public function timeIn(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!'], 400);
        }

        $now = now();
        $login = today()->setTime(8, 0);
        $earlyThreshold = $login->copy()->subMinutes(20); // 7:40 AM

        // Check if the user has already clocked in today
        $alreadyClockedIn = Attendance::where('user_id', $user->id)
            ->whereDate('timeIn', today())
            ->exists();

        if ($alreadyClockedIn) {
            $message = 'You have already clocked in today!';
            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message]);
            }

            return redirect()->back()->with([
                'message' => $message,
                'alert-type' => 'error',
            ]);
        }

        // Determine status
        if ($now >= $login) {
            $status = 'Late';
        } elseif ($now >= $earlyThreshold) {
            $status = 'On-time';
        } else {
            $status = 'Early';
        }

        Attendance::create([
            'user_id' => $user->id,
            'timeIn' => $now,
            'timeOut' => null,
            'totalHours' => null,
            'totalRate' => null,
            'status' => $status,
        ]);

        event(new MyEvent("Clocked in!"));
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
            return response()->json(['error' => 'No authenticated user!']);
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
                return response()->json(['status' => 'error', 'message' => $message]);
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

        event(new MyEvent("Clocked out!"));
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
