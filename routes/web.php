<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SorteioController;

Route::get("/anunciarGanhador/{id}", [SorteioController::class, 'anunciarGanhador'])->name('anunciarGanhador');
Route::get('/', [SorteioController::class, 'index'])->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get("/roleta", function () {
    return Inertia::render('Roleta');
})->name('roleta');

Route::post("/jackpot1", [SorteioController::class, 'sorteio'])->name('sorteio');
Route::post("/send-message", [ChatController::class, 'sendMessage']);

require __DIR__.'/auth.php';
