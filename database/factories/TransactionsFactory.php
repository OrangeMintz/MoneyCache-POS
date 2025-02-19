<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transactions>
 */
class TransactionsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cashier' => $this->faker->name,
            'time' => now(),
            'cash' => $this->faker->randomFloat(2, 100, 5000),
            'check' => $this->faker->randomFloat(2, 0, 2000),
            'bpi_ccard' => $this->faker->randomFloat(2, 0, 3000),
            'bpi_dcard' => $this->faker->randomFloat(2, 0, 3000),
            'metro_ccard' => $this->faker->randomFloat(2, 0, 3000),
            'metro_dcard' => $this->faker->randomFloat(2, 0, 3000),
            'paymaya' => $this->faker->randomFloat(2, 0, 1500),
            'aub_ccard' => $this->faker->randomFloat(2, 0, 1500),
            'gcash' => $this->faker->randomFloat(2, 0, 2000),
            'food_panda' => $this->faker->randomFloat(2, 0, 1000),
            'streetby' => $this->faker->randomFloat(2, 0, 1000),
            'grabfood' => $this->faker->randomFloat(2, 0, 1000),
            'gc_claimed_others' => $this->faker->randomFloat(2, 0, 500),
            'gc_claimed_own' => $this->faker->randomFloat(2, 0, 500),
            'mm_head' => $this->faker->randomFloat(2, 0, 1000),
            'mm_commissary' => $this->faker->randomFloat(2, 0, 1000),
            'mm_rm' => $this->faker->randomFloat(2, 0, 1000),
            'mm_dm' => $this->faker->randomFloat(2, 0, 1000),
            'mm_km' => $this->faker->randomFloat(2, 0, 1000),
            'food_charge' => $this->faker->randomFloat(2, 0, 500),
            'z_reading_pos' => $this->faker->randomFloat(2, 0, 5000),
            'sub_total_trade' => $this->faker->randomFloat(2, 0, 10000),
            'sub_total_non_trade' => $this->faker->randomFloat(2, 0, 5000),
            'over_pos' => $this->faker->randomFloat(2, 0, 500),
        ];
    }
}
