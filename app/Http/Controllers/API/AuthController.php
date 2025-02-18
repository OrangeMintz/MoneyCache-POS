<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
            "confirm_password" => "required|same:password"
        ]);

        if($validator->fails()){
            return response()->json([
                "status" => 0,
                "message" => "Validation Error",
                "data" => $validator->errors()->all()
            ]);
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            // "password" => $request->password
            "password" => bcrypt($request->password)

        ]);

        $response = [];
        $response['token']=$user->createToken("MyApp")->accessToken;
        $response['user']=$user->name;
        $response['email']=$user->email;

        return response()->json([
            "status" => 1,
            "message" => "User Registered",
            "data" => $response
        ]);
    }

    // public function login(Request $request){
    //     if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
    //         $user = Auth::user();
    //         $response = [];
    //         $response['token']=$user->createToken("MyApp")->accessToken;
    //         $response['user']=$user->name;
    //         $response['email']=$user->email;

    //         return response()->json([
    //             "status" => 1,
    //             "message" => "User Authenticated",
    //             "data" => $response
    //         ]);
    //     }
    //     return response()->json([
    //         "status" => 0,
    //         "message" => "User Unauthenticated",
    //         "data" => null
    //     ]);
    // }

    // public function login(Request $request){
    //     $credentials = $request->only('email', 'password');

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json([
    //             "status" => 0,
    //             "message" => "Invalid Credentials"
    //         ], 401);
    //     }

    //     $user = Auth::user();
    //     $token = $user->createToken("MyApp")->accessToken;

    //     return response()->json([
    //         "status" => 1,
    //         "message" => "User Authenticated",
    //         "token" => $token
    //     ]);
    // }

    // public function login(Request $request){
    //     $credentials = $request->only('email', 'password');

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json([
    //             "status" => 0,
    //             "message" => "Invalid Credentials"
    //         ], 401);
    //     }

    //     $user = Auth::user();

    //     // Generate access and refresh tokens
    //     $tokenResult = $user->createToken("MyApp");
    //     $accessToken = $tokenResult->accessToken;
    //     $refreshToken = $tokenResult->token->id; // Refresh token is stored in DB

    //     return response()->json([
    //         "status" => 1,
    //         "message" => "User Authenticated",
    //         "access_token" => $accessToken,
    //         "refresh_token" => $refreshToken,
    //         "token_type" => "Bearer",
    //     ]);
    // }

    //  public function login(Request $request){
    //         $credentials = $request->only('email', 'password');

    //         // Check if credentials are correct
    //         if (!Auth::attempt($credentials)) {
    //             return response()->json([
    //                 "status" => 0,
    //                 "message" => "Invalid Credentials"
    //             ], 401);
    //         }

    //         $user = Auth::user();

    //         // Generate access and refresh tokens using Passport
    //         $tokenResult = $user->createToken("MyApp");
    //         $accessToken = $tokenResult->accessToken;
    //         $refreshToken = $tokenResult->token->id; // Refresh token is stored in DB

    //         return response()->json([
    //             "status" => 1,
    //             "message" => "User Authenticated",
    //             "access_token" => $accessToken,
    //             "refresh_token" => $refreshToken,
    //             "token_type" => "Bearer",
    //         ]);
    // }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json([
                "status" => 0,
                "message" => "Invalid Credentials"
            ], 401);
        }

        $user = Auth::user();
        $tokenResult = $user->createToken("MyApp");
        $accessToken = $tokenResult->accessToken;

        // Store the token in an HttpOnly cookie
        $cookie = cookie('access_token', $accessToken, 60, null, null, false, true);

        return response()->json([
            "status" => 1,
            "message" => "User Authenticated"
        ])->withCookie($cookie);
    }



    public function loginUI(){
        return view("login");
    }

}
