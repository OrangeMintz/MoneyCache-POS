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
            // $table->string('cashier')->nullable();
            $table->foreignId('cashier_id_id')->constrained('users')->onDelete('cascade');
            $table->string('time');
            $table->decimal('cash', 10, 2)->nullable();
            $table->decimal('check', 10, 2)->nullable();
            $table->decimal('bpi_ccard', 10, 2)->nullable();
            $table->decimal('bpi_dcard', 10, 2)->nullable();
            $table->decimal('metro_ccard', 10, 2)->nullable();
            $table->decimal('metro_dcard', 10, 2)->nullable();
            $table->decimal('paymaya', 10, 2)->nullable();
            $table->decimal('aub_ccard', 10, 2)->nullable();
            $table->decimal('gcash', 10, 2)->nullable();
            $table->decimal('food_panda', 10, 2)->nullable();
            $table->decimal('streetby', 10, 2)->nullable();
            $table->decimal('grabfood', 10, 2)->nullable();
            $table->decimal('gc_claimed_others', 10, 2)->nullable();
            $table->decimal('gc_claimed_own', 10, 2)->nullable();
            $table->string('mm_head')->nullable();
            $table->string('mm_commissary')->nullable();
            $table->decimal('mm_rm', 10, 2)->nullable();
            $table->decimal('mm_dm', 10, 2)->nullable();
            $table->decimal('mm_km', 10, 2)->nullable();
            $table->decimal('food_charge', 10, 2)->nullable();
            $table->decimal('z_reading_pos', 10, 2)->nullable();
            $table->decimal('sub_total_trade', 10, 2)->nullable();
            $table->decimal('sub_total_non_trade', 10, 2)->nullable();
            $table->decimal('grand_total', 10, 2)->nullable();
            $table->decimal('over_pos', 10, 2)->nullable();
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
