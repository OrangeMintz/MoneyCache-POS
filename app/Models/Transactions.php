<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionsFactory> */
    use HasFactory;

        protected $fillable = ['cashier','time','cash','check','bpi_ccard','bpi_dcard','metro_ccard','metro_dcard','paymaya','aub_ccard','gcash','food_panda','streetby','grabfood','gc_claimed_others','gc_claimed_own','mm-head','mm-commissary','mm-rm','mm-dm','mm-km','food_charge','z_reading_pos','sub_total_trade','sub_total_non_trade', 'over-pos'];

}
