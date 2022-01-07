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
Route::get('login', [Controller::class, 'auth'])->name('login');
Route::get('redirect/{provider}', [AuthController::class, 'redirect'])->name('provider.redirect');
Route::get('callback/{provider}', [AuthController::class, 'callback'])->name('provider.callback');
Route::get('onetap/{credential}', [AuthController::class, 'onetap'])->name('onetap.support');
Route::post('attempt', [AuthController::class, 'attempt'])->name('auth.attempt');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');
Route::get('logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('auth.logout');
Route::get('me', [AuthController::class, 'me'])->middleware('auth:api')->name('auth.session');

Route::apiResource('session', SessionController::class)->middleware('auth:api');
