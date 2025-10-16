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

Route::get('/booking', function () {
    return Inertia::render('Booking');  
})->name('booking');


// Booking API endpoint (this is where your React form submits)
Route::middleware('auth')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
});

// Checks existing bookings so that when a new booking is made it doesnt conflict with existing bookings
Route::middleware('auth')->group(function () {
    Route::post('/check-booking', [BookingController::class, 'checkBooking'])->name('bookings.check');
});

// Calendar page
Route::middleware('auth')->group(function () {
    Route::get('/calendar', function () {
        return Inertia::render('Calendar');
    })->name('calendar');
});

// Events List Page
Route::middleware('auth')->group(function () {
    Route::get('/events-list', function () {
        $events = Event::all();
        return Inertia::render('EventsList', [
            'events' => $events
        ]);
    })->name('events-list');
});

// Deleting an event
Route::middleware('auth')->group(function () {
    Route::delete('/events/{id}', function($id) {
        $event =Event::findOrFail($id);
        $event->delete();
        return redirect()->back();
    });
});

// Edit an event. Save details
Route::middleware('auth')->group(function () {
    Route::put('/events/{id}', function(Request $request, $id){
        $event = \App\Models\Event::findOrFail($id);
        $event->update($request->all());
        return redirect()->back();
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Log out route
Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');

require __DIR__.'/auth.php';
