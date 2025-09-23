<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition()
    {
        $startTime = $this->faker->dateTimeBetween('now', '+1 month');
        $endTime = (clone $startTime)->modify('+'.rand(1, 5).' hours');

        return [
            'event_name' => $this->faker->catchPhrase(),
            'organiser' => $this->faker->name(),
            'company' => $this->faker->company(),
            'contact_number' => $this->faker->phoneNumber(),
            'contact_email' => $this->faker->unique()->safeEmail(),
            'event_date' => $startTime->format('Y-m-d'),
            'start_time' => $startTime->format('H:i:s'),
            'end_time' => $endTime->format('H:i:s'),
            'number_of_people' => $this->faker->numberBetween(10, 500),
            'parking' => $this->faker->optional()->word(),
            'access_required' => $this->faker->optional()->time('H:i').' - '.$this->faker->optional()->time('H:i'),
            'aircon_time' => $this->faker->optional()->time('H:i').' - '.$this->faker->optional()->time('H:i'),
            
            'wants_catering' => $this->faker->boolean(30),
            'catering_required' => $this->faker->optional()->sentence(),
            'caterer' => $this->faker->optional()->company(),
            'catering_organiser' => $this->faker->optional()->name(),
            'alcohol' => $this->faker->optional()->randomElement(['Yes', 'No']),
            'catering_time_required' => $this->faker->optional()->time('H:i').' - '.$this->faker->optional()->time('H:i'),
            'catering_gl_code' => $this->faker->optional()->numerify('GL###'),
            'dietary_requirements' => $this->faker->optional()->sentence(),

            'wants_equipment' => $this->faker->boolean(30),
            'av_equipment' => $this->faker->optional()->word(),
            'chairs' => $this->faker->optional()->numberBetween(10, 100),
            'tables' => $this->faker->optional()->numberBetween(1, 20),
            'displays' => $this->faker->optional()->word(),
            'marketing_signage' => $this->faker->optional()->word(),
            'equipment_gl_code' => $this->faker->optional()->numerify('GL###'),

            'wants_extras' => $this->faker->boolean(20),
            'boards' => $this->faker->optional()->word(),
            'furniture' => $this->faker->optional()->word(),
            'comms' => $this->faker->optional()->word(),
            'for_visitors' => $this->faker->optional()->word(),
            'music' => $this->faker->optional()->word(),
            'arriving' => $this->faker->optional()->word(),
        ];
    }
}
