<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'timeIn',
        'timeOut',
        'totalHours',
        'totalRate',
        'status',
    ];

    /**
     * Relationship: An attendance record belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
