<?php

use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::resource('home', 'HomeController');

Route::apiResource('track', 'TrackController');

Route::resource('vibe', 'VibeController');

Route::post('/vibe', 'VibeController@store');

Route::get('/callback', function () {

    app('Spotify')->requestAccessToken($_GET['code']);
    $accessToken = app('Spotify')->getAccessToken();

    Session::put('accessToken', $accessToken);
    Session::forget('credentialsToken');
    return redirect('home');
});