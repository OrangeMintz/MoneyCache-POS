<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'transaction_id',
        'activity_user_id',
        'type',
        'category',
        'message',
        'total_hours',
    ];

    /**
     * Get the user who performed the activity.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the transaction related to this log (if any).
     */
    public function transaction()
    {
        return $this->belongsTo(Transactions::class);
    }

    /**
     * Get the user affected by the activity (for admin actions).
     */
    public function activityUser()
    {
        return $this->belongsTo(User::class, 'activity_user_id');
    }
}
