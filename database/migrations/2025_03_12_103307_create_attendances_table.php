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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // References users table
            $table->timestamp('timeIn')->nullable();
            $table->timestamp('timeOut')->nullable();
            $table->decimal('totalHours', 5, 2)->default(0)->nullable();
            $table->decimal('totalRate', 10, 2)->default(0)->nullable();
            $table->string('photo')->nullable(); // Add this field for image path
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
