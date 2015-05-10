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
            'Commuttr\Repositories\Users\UserRepositoryInterface',
            'Commuttr\Repositories\Users\DbUserRepository');
	}

}
