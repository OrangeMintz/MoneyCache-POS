<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionsGrossTotal extends Model
{
    protected $fillable = [
        'gross_cash', 'gross_check', 'gross_bpi_ccard', 'gross_bpi_dcard', 'gross_metro_ccard', 'gross_metro_dcard',
        'gross_paymaya', 'gross_aub_ccard', 'gross_gcash', 'gross_food_panda', 'gross_streetby', 'gross_grabfood',
        'gross_gc_claimed_others', 'gross_gc_claimed_own', 'gross_mm_rm', 'gross_mm_dm', 'gross_mm_km',
        'gross_food_charge', 'gross_z_reading_pos','gross_sub_total_trade',
        'gross_sub_total_non_trade','gross_grand_total', 'gross_over_pos'
    ];
}
