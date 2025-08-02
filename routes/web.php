<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('index');
});

Route::get('/book-event', function () {
    return view('book-event');
})->name('book.event');

Route::post('/book-event', [EventController::class, 'store'])->name('book.event.submit');

Route::get('/list-event', [EventController::class, 'index'])->name('event.list');

Route::get('/events', function () {
    return redirect()->route('event.list');
});

Route::get('/spaces', function () {
    return view('list-space');
})->name('spaces.list');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes only for guests (not logged in)
Route::middleware('guest')->group(function () {
    Route::view('/login', 'auth.login')->name('login'); // Show your Blade login view

    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

// Routes only for authenticated users
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});