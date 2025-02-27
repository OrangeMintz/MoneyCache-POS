<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Transactions extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionsFactory> */
    use HasFactory, SoftDeletes;

        protected $fillable = ['cashier_id','time','cash','check','bpi_ccard','bpi_dcard',
        'metro_ccard','metro_dcard','paymaya','aub_ccard','gcash','food_panda','streetby',
        'grabfood','gc_claimed_others','gc_claimed_own','mm_head','mm_commissary','mm_rm',
        'mm_dm','mm_km','food_charge','z_reading_pos','sub_total_trade',
        'sub_total_non_trade','grand_total', 'over_pos'];

    public function cashier()
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }
}
