<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Cashier extends Model
{
    use HasFactory;

    protected $table = 'cashiers';

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

     protected $fillable = [

     ];
}
