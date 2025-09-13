<?php
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;

// Home: list upcoming events with optional search/filters; render Events page
Route::get('/', function (Request $request) {
    // Query params (all optional)
    $q         = trim((string) $request->input('q', ''));          
    $organiser = trim((string) $request->input('organiser', ''));  
    $when      = trim((string) $request->input('when', ''));       
    $perPage   = 4; // TODO: increase to 9 when UI is settled

    // Base query: upcoming events ordered by soonest
    $query = Event::query()
        ->where('event_date', '>', now()->toDateString()) // only future-dated events
        ->orderBy('event_date', 'asc'); // soonest first

    // search across name or organiser (case-insensitive, partial..)
    if ($q !== '') {
        $query->where(function ($s) use ($q) {
            $s->where('event_name', 'like', "%{$q}%")
              ->orWhere('organiser',  'like', "%{$q}%");
        });
    }
    // Organiser filter (ignore empty/null)
    if ($organiser !== '' && $organiser !== null){
        $query->where('organiser', $organiser); 
    }
    // Time buckets
    if ($when == 'week') {
        $query->whereBetween('event_date', [now()->startOfWeek(), now()->endOfWeek()]); // current week
    } elseif ($when == 'month') {
        $query->whereBetween('event_date', [now()->startOfMonth(), now()->endOfMonth()]); // current month
    }

    // Execute with pagination: keep current filters in the links
    $events = $query->simplePaginate($perPage)->withQueryString();

    // Build organiser options for the dropdown (distinct, sorted)
    $organisers = Event::distinct()
        ->orderBy('organiser')
        ->pluck('organiser');
    
    // Render page component with paginator + organiser list
    return Inertia::render('Events', 
    [   
        'events' => $events,    // paginator object
        'organisers' => $organisers, // names for dropdown
    ]);
});


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
