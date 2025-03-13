<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LogsController extends Controller
{
    public function index(Request $request){

        $user = Auth::user();

        $logs = $user->role == 'admin' ? Logs::with(['user',
         'activityUser' => function($query) {
            $query->withTrashed();
         },
         'transaction' => function($query) {
            $query->withTrashed();
         }
         ])->get():
         Logs::where('user_id', $user->id)->with(['user',
         'activityUser' => function($query) {
            $query->withTrashed();
         },
         'transaction' => function($query) {
            $query->withTrashed();
         }
         ])->get();

        if ($request->wantsJson()) {
            return response()->json([
                "status" => 1,
                "logs" => $logs
            ]);
        }else{
            // Diri ibutang inyong logic for laravel
        }

    }

    public function storeUserLog($userId, $newUserId, $category)
    {
        $admin = User::find($userId); // Get the admin user
        $adminName = $admin ? $admin->name : 'null'; // Fallback if user not found

        Logs::create([
            'user_id' => $userId, // Admin who created the user
            'transaction_id' => null, // No transaction involved
            'activity_user_id' => $newUserId, // The user that was created
            'type' => 'user',
            'category' => $category,
            'message' => ($category === 'add') ? "added a new user" : $category . "d a user",
            'total_hours' => null, // Not applicable
        ]);
    }

    public function storeTransactionLog($userId, $transactionId, $category)
    {
        $admin = User::find($userId);
        $adminName = $admin ? $admin->name : 'null';

        Logs::create([
            'user_id' => $userId,
            'transaction_id' => $transactionId,
            'activity_user_id' => null,
            'type' => 'transaction',
            'category' => $category,
            'message' => ($category === 'add') ? "added a new transaction" : $category . "d a transaction",
            'total_hours' => null,
        ]);
    }

    public function storeAttendance($userId, $category)
    {
        $user = User::find($userId);
        // $timezone = new DateTimeZone(env('APP_TIMEZONE'));

        // logout time
        // $logout = new DateTime('today', $timezone);
        $logout = today()->setTime(17, 0, 0);
        // login time
        // $login = new DateTime('today', $timezone);
        $login = today()->setTime(8, 0, 0);

        $now = now(); // time now
        $totalHours = null;

        if (Logs::whereDate('created_at', $now->format('Y-m-d'))
            ->where('category', $category) // Dynamically check for timein or timeout
            ->where('user_id', $userId)
            ->exists()) {
            return response()->json(['error' => 'Duplicate ' . $category . ' record found.'], 400);
        }

        if($category == 'timeout'){
            try {
                $timein = Logs::whereDate('created_at', $now->format('Y-m-d')) // Get user's time in for today
                ->where('category', 'timein') // Match category
                ->where('user_id', $userId) // Match user_id
                ->first();

                if(!$timein){
                    return response()->json(['error' => 'No timein record found.'], 500);
                }

                $timeInDateTime = new DateTime($timein->created_at, $timezone);

                // split the date by ':' and calculate the decimal value
                list($hours, $minutes, $seconds) = explode(":", $timeInDateTime->diff($now)->format('%h:%i:%s'));
                $decimalHours = $hours + ($minutes / 60) + ($seconds / 3600);
                $totalHours = number_format($decimalHours,2,'.','');

            } catch (\Exception $e) {
                Log::error('Error fetching time-in log: ' . $e->getMessage());
                return response()->json(['error' => 'Something went wrong while fetching the time-in log.'], 500);
            }
        }

        Logs::create([
            'user_id' => $userId,
            'transaction_id' =>  null,
            'activity_user_id' => null,
            'type' => 'attendance',
            'category' => $category,
            'message' => ($category == 'Clocked In') ? "logged in" : "logged out",
            'total_hours' => $totalHours,
        ]);

        return response()->json([
                'status' => 1,
                'category' => $category,
                'logout' => $logout->format('Y-m-d H:i:s'),
                'login' => $login->format('Y-m-d H:i:s'),
                'now' => $now->format('Y-m-d H:i:s'),
                'total_hours' => $totalHours,
            ]);
    }

    public function test(Request $request){
        return $this->storeAttendance(1, 'timeout');
    }
}
