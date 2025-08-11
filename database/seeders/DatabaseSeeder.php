<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 2 admin users
        User::factory()->create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
        ]);
        User::factory()->create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
        ]);

        // Create 5 regular users
        User::factory(5)->create();

        // Create 20 events
        Event::factory(20)->create();
    }
}
