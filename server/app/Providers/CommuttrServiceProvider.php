<?php namespace Commuttr\Providers;

use Illuminate\Support\ServiceProvider;

class CommuttrServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
        $this->app->bind(
            'Commuttr\Repositories\Coordinates\CoordinatesRepositoryInterface',
            'Commuttr\Repositories\Coordinates\DbCoordinatesRepository');

        $this->app->bind(
            'Commuttr\Repositories\Route\RouteRepositoryInterface',
            'Commuttr\Repositories\Route\DbRouteRepository');

        $this->app->bind(
            'Commuttr\Repositories\Review\ReviewRepositoryInterface',
            'Commuttr\Repositories\Review\DbReviewRepository');

		$this->app->bind(
            'Commuttr\Repositories\User\UserRepositoryInterface',
            'Commuttr\Repositories\User\DbUserRepository');
	}

}
