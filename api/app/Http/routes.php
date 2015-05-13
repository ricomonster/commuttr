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

Route::get('/', 'WelcomeController@index');
Route::group(['prefix' => 'auth'], function() {
    Route::get('login', 'AuthController@login');
    Route::get('register', 'AuthController@register');
});

Route::group(['prefix' => 'routes'], function() {
    Route::group(['middleware' => 'auth'], function() {
        Route::get('create', 'RoutesController@create');
    });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'api/v0.2'], function() {
    Route::group(['prefix' => 'auth'], function() {
        Route::post('login', 'Api\ApiAuthController@login');
    });

    Route::group(['prefix' => 'routes'], function() {
        Route::get('all', 'Api\ApiRoutesController@all');
        Route::get('search', 'Api\ApiRoutesController@search');

        Route::post('create', 'Api\ApiRoutesController@create');
    });

    Route::group(['prefix' => 'users'], function() {
        Route::post('create', 'Api\ApiUsersController@create');
    });
});
