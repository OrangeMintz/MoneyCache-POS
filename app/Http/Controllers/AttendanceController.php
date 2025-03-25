<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use App\Events\MyEvent;
use DateTime;
use DateTimeZone;

//
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index(Request $request) {
        $attendance = $this->retrieve($request);
        return view('pages.attendance', compact('attendance'));
    }

    public function retrieve(Request $request) {
        $user = Auth::user();

        $attendance = $user->role == 'admin'
            ? Attendance::with(['user' => function ($query) {
                $query->withTrashed(); // gets the cashier even if it is soft deleted
            }])->get()
            : Attendance::where('user_id', $user->id)->with('user')->get();

        if ($request->wantsJson()) {
            return response()->json([
                "status" => 1,
                "attendance" => $attendance,
            ]);
        }

        return $attendance; // Return the collection for use in `compact()`
    }

    public function timeOut(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!']);
        }

        $now = now()->setTimezone(config('app.timezone'));

        // Get the latest attendance record for today
        $attendance = Attendance::where('user_id', $user->id)
            ->whereDate('timeIn', today())
            ->whereNull('timeOut') // Ensure it's not already timed out
            ->latest()
            ->first();

        if (!$attendance) {
            $message = 'You have not clocked in today or have already clocked out!';
            return $request->wantsJson()
                ? response()->json(['status' => 'error', 'message' => $message])
                : redirect()->back()->with(['message' => $message, 'alert-type' => 'error']);
        }

        // $timeIn = \Carbon\Carbon::parse($attendance->timeIn);
        $timeIn = \Carbon\Carbon::parse($attendance->timeIn)->setTimezone(config('app.timezone'));


        // Restrict timeout if less than 1 hour from timeIn
        if (abs($now->diffInSeconds($timeIn)) < 60) {
            $message = 'You cannot clock out within a minute of clocking in!';
            return $request->wantsJson()
                ? response()->json(['status' => 'error', 'message' => $message], 400)
                : redirect()->back()->with(['message' => $message, 'alert-type' => 'error']);
        }


        // Calculate total hours and rate
        $totalHours = $timeIn->diffInMinutes($now) / 60;
        $totalRate = $totalHours * $user->rate;

        // Update the attendance record
        $attendance->update([
            'timeOut' => $now,
            'totalHours' => $totalHours,
            'totalRate' => $totalRate,
        ]);

        event(new MyEvent("Clocked out!"));
        (new LogsController)->storeAttendance($user->id, 'timeout');

        $message = 'Clocked Out Successfully!';
        return $request->wantsJson()
            ? response()->json(['status' => 'success', 'message' => $message], 200)
            : redirect()->back()->with(['message' => $message, 'alert-type' => 'success']);
    }


        // public function timeIn(Request $request) {
    //     $user = Auth::user();
    //     if (!$user) {
    //         return response()->json(['error' => 'No authenticated user!'], 400);
    //     }

    //     $now = now();
    //     $login = today()->setTime(8, 0);
    //     $earlyThreshold = $login->copy()->subMinutes(20);

    //     // Check if the user has already clocked in today
    //     $alreadyClockedIn = Attendance::where('user_id', $user->id)
    //         ->whereDate('timeIn', today())
    //         ->exists();

        // if ($alreadyClockedIn) {
        //     $message = 'You have already clocked in today!';
        //     if ($request->wantsJson()) {
        //         return response()->json(['status' => 'error', 'message' => $message]);
        //     }

        //     return redirect()->back()->with([
        //         'message' => $message,
        //         'alert-type' => 'error',
        //     ]);
        // }

    //     // Determine status
    //     if ($now >= $login) {
    //         $status = 'Late';
    //     } elseif ($now >= $earlyThreshold) {
    //         $status = 'On-time';
    //     } else {
    //         $status = 'Early';
    //     }

    //     Attendance::create([
    //         'user_id' => $user->id,
    //         'timeIn' => $now,
    //         'timeOut' => null,
    //         'totalHours' => null,
    //         'totalRate' => null,
    //         'status' => $status,
    //     ]);

        // event(new MyEvent("Clocked in!"));
        // (new LogsController)->storeAttendance($user->id,'Clocked In');
        // $message = 'Clocked In Successfully!';
        // if ($request->wantsJson()) {
        //     return response()->json(['status' => 'success', 'message' => $message], 200);
        // }

        // return redirect()->back()->with([
        //     'message' => $message,
        //     'alert-type' => 'success',
        // ]);
    // }

    // public function timeIn(Request $request)
    // {
    //     $user = Auth::user();
    //     if (!$user) {
    //         return response()->json(['error' => 'No authenticated user!'], 400);
    //     }

    //     $now = now();
    //     $login = today()->setTime(8, 0);
    //     $earlyThreshold = $login->copy()->subMinutes(20);

    //     // Check if the user has already clocked in today
    //     $alreadyClockedIn = Attendance::where('user_id', $user->id)
    //         ->whereDate('timeIn', today())
    //         ->exists();

    //     if ($alreadyClockedIn) {
    //         return response()->json(['status' => 'error', 'message' => 'You have already clocked in today!']);
    //     }

    //     $status = ($now >= $login) ? 'Late' : (($now >= $earlyThreshold) ? 'On-time' : 'Early');

    //     $attendance = Attendance::create([
    //         'user_id' => $user->id,
    //         'timeIn' => $now,
    //         'timeOut' => null,
    //         'totalHours' => null,
    //         'totalRate' => null,
    //         'status' => $status,
    //         'photo' => null, // Initially null, will be updated later
    //     ]);

    //     event(new MyEvent("Clocked in!"));
    //     (new LogsController)->storeAttendance($user->id, 'Clocked In');

    //     return $attendance; // Return the created attendance record
    // }


    public function saveClockInPhoto(Request $request)
    {
        $request->validate([
            'selfie_data' => 'required|string',
        ]);

        $imageData = str_replace(['data:image/png;base64,', ' '], ['', '+'], $request->input('selfie_data'));
        $image = base64_decode($imageData);

        if ($image === false) {
            return response()->json(['error' => 'Invalid image data'], 400);
        }

        $uniqueName = now()->format('Y-m-d') . '-' . Str::random(10) . '.png';
        $path = "clocksphoto/{$uniqueName}";

        Storage::disk('public')->put($path, $image);

        return $path; // Return path so it can be used later
    }

    public function attendance(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'No authenticated user!'], 400);
        }

        $now = now();
        $login = today()->setTime(8, 0);
        $earlyThreshold = $login->copy()->subMinutes(20);

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

        $status = ($now >= $login) ? 'Late' : (($now >= $earlyThreshold) ? 'On-time' : 'Early');

        // Save the clock-in photo and get the path
        $photoPath = $this->saveClockInPhoto($request);

        // Create the attendance record
        $attendance = Attendance::create([
            'user_id' => $user->id,
            'timeIn' => $now,
            'timeOut' => null,
            'totalHours' => null,
            'totalRate' => null,
            'status' => $status,
            'photo' => $photoPath,
        ]);

        // event(new MyEvent("Clocked in!"));
        // (new LogsController)->storeAttendance($user->id, 'Clocked In');

        event(new MyEvent("Clocked in!"));
        (new LogsController)->storeAttendance($user->id,'Clocked In');
        $message = 'Clocked In Successfully!';
        if ($request->wantsJson()) {
            return response()->json(['status' => 'success', 'message' => $message], 200);
        }

        return redirect()->back()->with([
            'message' => $message,
            'alert-type' => 'success',
        ]);

        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'Clocked in successfully with photo!',
        //     'photo_url' => asset('storage/' . $photoPath),
        //     'attendance' => $attendance,
        // ]);
    }
}
