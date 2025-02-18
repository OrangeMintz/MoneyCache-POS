<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SalesController extends Controller
{

    public function index(Request $request){

        return response()->json([
            "status" => 1,
            "message" => "This is sales records",
        ]);
    }
}
