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
    Route::group(['prefix' => 'auth'], function() {
        Route::post('login', 'ApiAuthController@login');
    });

    Route::group(['prefix' => 'routes'], function() {
        Route::get('get_route', 'ApiRoutesController@getRoute');
        Route::get('search', 'ApiRoutesController@searchRoutes');

        Route::post('create', 'ApiRoutesController@create');
        Route::post('viewed', 'ApiRoutesController@viewed');
    });

    Route::group(['prefix' => 'transportation'], function() {
        Route::get('vehicle_lists', 'ApiTransportationController@vehicleList');
    });

    Route::group(['prefix' => 'users'], function() {
        Route::get('get_user', 'ApiUsersController@getUser');

        Route::post('create', 'ApiUsersController@create');
        Route::post('update_details', 'ApiUsersController@update');
    });

    Route::group(['prefix' => 'vehicles'], function() {
        Route::get('detail', 'ApiVehiclesController@detail');
        Route::get('lists', 'ApiVehiclesController@lists');

        Route::post('create', 'ApiVehiclesController@create');
    });
});
