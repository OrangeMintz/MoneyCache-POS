<?php

namespace Database\Seeders;

use App\Models\Transactions;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Transactions::factory(15)->create();
        User::factory(2)->create();
    }
}
