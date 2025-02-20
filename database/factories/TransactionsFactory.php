<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
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
            'time' => $this->faker->randomElement(["AM", "MID", "PM"]),
            'cash' => $this->faker->randomFloat(2, 0, 5000),
            'check' => $this->faker->randomFloat(2, 0, 5000),
            'bpi_ccard' => $this->faker->randomFloat(2, 0, 5000),
            'bpi_dcard' => $this->faker->randomFloat(2, 0, 5000),
            'metro_ccard' => $this->faker->randomFloat(2, 0, 5000),
            'metro_dcard' => $this->faker->randomFloat(2, 0, 5000),
            'paymaya' => $this->faker->randomFloat(2, 0, 5000),
            'aub_ccard' => $this->faker->randomFloat(2, 0, 5000),
            'gcash' => $this->faker->randomFloat(2, 0, 5000),
            'food_panda' => $this->faker->randomFloat(2, 0, 5000),
            'streetby' => $this->faker->randomFloat(2, 0, 5000),
            'grabfood' => $this->faker->randomFloat(2, 0, 5000),
            'gc_claimed_others' => $this->faker->randomFloat(2, 0, 5000),
            'gc_claimed_own' => $this->faker->randomFloat(2, 0, 5000),
            'mm_head' => $this->faker->optional()->name,
            'mm_commissary' => $this->faker->optional()->company,
            'mm_rm' => $this->faker->randomFloat(2, 0, 5000),
            'mm_dm' => $this->faker->randomFloat(2, 0, 5000),
            'mm_km' => $this->faker->randomFloat(2, 0, 5000),
            'food_charge' => $this->faker->randomFloat(2, 0, 5000),
            'z_reading_pos' => $this->faker->randomFloat(2, 0, 5000),
            'sub_total_trade' => $this->faker->randomFloat(2, 0, 5000),
            'sub_total_non_trade' => $this->faker->randomFloat(2, 0, 5000),
            'grand_total' => $this->faker->randomFloat(2, 0, 5000),
            'over_pos' => $this->faker->randomFloat(2, 0, 5000),
        ];
    }
}
