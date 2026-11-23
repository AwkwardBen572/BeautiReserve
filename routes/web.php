<?php

use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::inertia('/login', 'login/Login')->name('login');
});

Route::middleware('auth')->group(function () {
    Route::inertia('/', 'home/Home')->name('home');
});

