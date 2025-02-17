<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [

    ];
}
