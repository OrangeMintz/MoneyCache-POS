<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('cashier');
            $table->timestamp('time')->nullable();
            $table->decimal('cash', 10, 2)->default(0);
            $table->decimal('check', 10, 2)->default(0);
            $table->decimal('bpi_ccard', 10, 2)->default(0);
            $table->decimal('bpi_dcard', 10, 2)->default(0);
            $table->decimal('metro_ccard', 10, 2)->default(0);
            $table->decimal('metro_dcard', 10, 2)->default(0);
            $table->decimal('paymaya', 10, 2)->default(0);
            $table->decimal('aub_ccard', 10, 2)->default(0);
            $table->decimal('gcash', 10, 2)->default(0);
            $table->decimal('food_panda', 10, 2)->default(0);
            $table->decimal('streetby', 10, 2)->default(0);
            $table->decimal('grabfood', 10, 2)->default(0);
            $table->decimal('gc_claimed_others', 10, 2)->default(0);
            $table->decimal('gc_claimed_own', 10, 2)->default(0);
            $table->decimal('mm_head', 10, 2)->default(0);
            $table->decimal('mm_commissary', 10, 2)->default(0);
            $table->decimal('mm_rm', 10, 2)->default(0);
            $table->decimal('mm_dm', 10, 2)->default(0);
            $table->decimal('mm_km', 10, 2)->default(0);
            $table->decimal('food_charge', 10, 2)->default(0);
            $table->decimal('z_reading_pos', 10, 2)->default(0);
            $table->decimal('sub_total_trade', 10, 2)->default(0);
            $table->decimal('sub_total_non_trade', 10, 2)->default(0);
            $table->decimal('over_pos', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
