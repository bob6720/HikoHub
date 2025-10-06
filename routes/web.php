<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;

// Home: list upcoming events with optional search/filters; render Events page
Route::get('/', function (Request $request) {
    $q       = trim((string) $request->input('q', ''));          
    $company = trim((string) $request->input('company', ''));  
    $when    = trim((string) $request->input('when', ''));       
    $perPage = 9; 

    $query = Event::query()
        ->where('event_date', '>', now()->toDateString())
        ->orderBy('event_date', 'asc');

    if ($q !== '') {
        $query->where(function ($s) use ($q) {
            $s->where('event_name', 'like', "%{$q}%")
              ->orWhere('organiser', 'like', "%{$q}%");
        });
    }

    if ($company !== '' && $company !== null) {
        $query->where('company', $company);
    }

    if ($when == 'week') {
        $query->whereBetween('event_date', [now()->startOfWeek(), now()->endOfWeek()]);
    } elseif ($when == 'month') {
        $query->whereBetween('event_date', [now()->startOfMonth(), now()->endOfMonth()]);
    }

    $events = $query->simplePaginate($perPage)->withQueryString();

    $companies = Event::distinct()
        ->orderBy('company')
        ->pluck('company');
    
    return Inertia::render('Events', [   
        'events'    => $events,
        'companies' => $companies,
    ]);
});

// Booking form page (renders Booking.vue/Booking.jsx) -Updated to only allow access to authenticated users
Route::middleware('auth')->group(function () {
Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');
});

// Booking API endpoint (this is where your React form submits)
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

// Checks existing bookings so that when a new booking is made it doesnt conflict with existing bookings
Route::post('/check-booking', [BookingController::class, 'checkBooking'])->name('bookings.check');


// Calendar page
Route::get('/calendar', function () {
    return Inertia::render('Calendar');
})->name('calendar');

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
