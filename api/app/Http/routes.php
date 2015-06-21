<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api/v2.0', 'middleware' => 'corsFilter'], function() {
    Route::group(['prefix' => 'routes'], function() {
        Route::get('search', 'ApiRoutesController@searchRoutes');

        Route::post('create', 'ApiRoutesController@create');
    });

    Route::group(['prefix' => 'users'], function() {
        Route::get('get_user', 'ApiUsersController@getUser');

        Route::post('create', 'ApiUsersController@create');
    });
});
