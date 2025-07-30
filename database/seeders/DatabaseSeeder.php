<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create 2 admin users
        User::factory()->admin()->create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
        ]);
        User::factory()->admin()->create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
        ]);

        // Create 5 regular users
        User::factory(5)->create();

        // Create 20 events
        Event::factory(20)->create();
    }
}