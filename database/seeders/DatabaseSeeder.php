<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Transactions;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Transactions::factory(15)->create();
    }
}
