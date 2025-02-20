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
        Schema::create('transactions_gross_totals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained('transactions')->onDelete('cascade');
            $table->decimal('gross_cash', 10, 2)->default(0);
            $table->decimal('gross_check', 10, 2)->default(0);
            $table->decimal('gross_bpi_ccard', 10, 2)->default(0);
            $table->decimal('gross_bpi_dcard', 10, 2)->default(0);
            $table->decimal('gross_metro_ccard', 10, 2)->default(0);
            $table->decimal('gross_metro_dcard', 10, 2)->default(0);
            $table->decimal('gross_paymaya', 10, 2)->default(0);
            $table->decimal('gross_aub_ccard', 10, 2)->default(0);
            $table->decimal('gross_gcash', 10, 2)->default(0);
            $table->decimal('gross_food_panda', 10, 2)->default(0);
            $table->decimal('gross_streetby', 10, 2)->default(0);
            $table->decimal('gross_grabfood', 10, 2)->default(0);
            $table->decimal('gross_gc_claimed_others', 10, 2)->default(0);
            $table->decimal('gross_gc_claimed_own', 10, 2)->default(0);
            $table->decimal('gross_mm_rm', 10, 2)->default(0);
            $table->decimal('gross_mm_dm', 10, 2)->default(0);
            $table->decimal('gross_mm_km', 10, 2)->default(0);
            $table->decimal('gross_food_charge', 10, 2)->default(0);
            $table->decimal('gross_z_reading_pos', 10, 2)->default(0);
            $table->decimal('gross_sub_total_trade', 10, 2)->default(0);
            $table->decimal('gross_sub_total_non_trade', 10, 2)->default(0);
            $table->decimal('gross_grand_total', 10, 2)->default(0);
            $table->decimal('gross_over_pos', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions_gross_totals');
    }
};
