<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsvController extends Controller
{
    public function csv(Request $request){
        return response()->json([
            "message" => "nigga"
        ]);
    }
}
