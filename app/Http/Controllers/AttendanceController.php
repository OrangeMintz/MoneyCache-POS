<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use App\Events\MyEvent;
use DateTime;
use DateTimeZone;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Log;

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

        return $attendance;
    }

    // public function timeIn(Request $request) {
    //     $request->validate([
    //         'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     ]);

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
    //         $message = 'You have already clocked in today!';
    //         if ($request->wantsJson()) {
    //             return response()->json(['status' => 'error', 'message' => $message]);
    //         }

    //         return redirect()->back()->with([
    //             'message' => $message,
    //             'alert-type' => 'error',
    //         ]);
    //     }

    //     // Determine status
    //     if ($now >= $login) {
    //         $status = 'Late';
    //     } elseif ($now >= $earlyThreshold) {
    //         $status = 'On-time';
    //     } else {
    //         $status = 'Early';
    //     }

    //      // Upload image to Cloudinary
    //      $uploadedImage = Cloudinary::uploadApi()->upload($request->file('image')->getRealPath());
    //      $uploadedImageUrl = $uploadedImage['secure_url'];

    //     Attendance::create([
    //         'user_id' => $user->id,
    //         'timeIn' => $now,
    //         'timeOut' => null,
    //         'totalHours' => null,
    //         'totalRate' => null,
    //         'status' => $status,
    //         'photo' => $uploadedImageUrl,
    //     ]);

    //     event(new MyEvent("Clocked in!"));
    //     (new LogsController)->storeAttendance($user->id,'Clocked In');
    //     $message = 'Clocked In Successfully!';
    //     if ($request->wantsJson()) {
    //         return response()->json(['status' => 'success', 'message' => $message], 200);
    //     }

    //     return redirect()->back()->with([
    //         'message' => $message,
    //         'alert-type' => 'success',
    //     ]);
    // }

    // MODIFIED
        public function timeIn(Request $request) {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

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
                    return response()->json(['status' => 'error', 'message' => $message], 400);
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

            // Upload image to Cloudinary
            if ($request->hasFile('image')) {
                $uploadedImage = Cloudinary::uploadApi()->upload($request->file('image')->getRealPath());
                $uploadedImageUrl = $uploadedImage['secure_url'];
            } else {
                $message = 'Image upload failed!';
                if ($request->wantsJson()) {
                    return response()->json(['status' => 'error', 'message' => $message]);
                }

                return redirect()->back()->with([
                    'message' => $message,
                    'alert-type' => 'error',
                ]);
            }

            $attendance = Attendance::create([
                'user_id' => $user->id,
                'timeIn' => $now,
                'timeOut' => null,
                'totalHours' => null,
                'totalRate' => null,
                'status' => $status,
                'photo' => $uploadedImageUrl,
            ]);

        event(new MyEvent("Clocked in!"));
        (new LogsController)->storeAttendance($user->id, 'Clocked In' ,$attendance->id);
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

    public function test(Request $request){
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Upload image to Cloudinary
        $uploadedImage = Cloudinary::uploadApi()->upload($request->file('image')->getRealPath());
        $uploadedImageUrl = $uploadedImage['secure_url'];
        return response()->json(['url' => $uploadedImageUrl]);
    }
}
