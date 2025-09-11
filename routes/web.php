<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;


// Homepage route: fetch upcoming events and render Events page
Route::get('/', function () {
    $events = Event::where('event_date', '>', now()->toDateString())
                    ->orderBy('event_date', 'asc')
                    ->get();
    // Render Events page with events passed as props
    return Inertia::render('Events', ['events' => $events]);
});

// Route::get('/', function () {
//     return Inertia::render('Welcome', [ 
//         'canLogin' => Route::has('login'), 
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');

Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->name('calendar');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
