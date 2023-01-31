<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', [Controller::class, 'routes'])
    ->name('entry-point')
    ->withoutMiddleware('api');
Route::get('example', [Controller::class, 'example'])->name('example');
Route::get('error', [Controller::class, 'exampleError'])->name('error');

// Authentication
Route::get('login/{token}', [AuthController::class, 'login'])->name('login');

Route::controller(AuthController::class)->group(function () {
    Route::get('redirect/{provider}', 'redirect')->name('provider.redirect');
    Route::get('callback/{provider}', 'callback')->name('provider.callback');
    Route::get('onetap/{credential}', 'onetap')->name('onetap.support');
    Route::post('attempt', 'attempt')->name('auth.attempt');
    Route::post('login', 'login')->name('auth.login');
    Route::get('logout', 'logout')->middleware('auth:api')->name('auth.logout');
    Route::get('me', 'me')->middleware('auth:api')->name('auth.session');
});

Route::apiResource('session', SessionController::class)->middleware('auth:api');
