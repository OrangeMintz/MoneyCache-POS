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

    public function timein(){
        $user = Auth::user();
        $timezone = new DateTimeZone(env('APP_TIMEZONE'));
        $now = new DateTime('now', $timezone);

        // logout time
        $logout = new DateTime('today', $timezone);
        $logout->setTime(17, 0, 0);
        // login time
        $login = new DateTime('today', $timezone);
        $login->setTime(8, 0, 0);

        // checks if user is early or late
        $status = ($now < $login) ? 'Early' : (($now == $login) ? 'On Time' : 'Late');

        if(!$user){
            return response()->json(['error' => 'No authenticated user!'], 400);
        }else{
            Attendance::create([
                'user_id' => $user->id, 
                'timeIn' => $now, 
                'timeOut' => null, 
                'totalHours' => null,
                'totalRate' => null,
                'status' => $status,
            ]);
        }
    }
}
