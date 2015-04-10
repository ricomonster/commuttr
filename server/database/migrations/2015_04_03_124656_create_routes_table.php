<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoutesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('routes', function(Blueprint $table)
		{
			$table->increments('id');
            $table->integer('contributor_id')->unsigned();
            $table->string('route_name');
            $table->string('to');
            $table->string('from');
            $table->tinyInteger('vice_versa')->unsigned()
                ->default(0);
            $table->string('mode_of_transportation');
            $table->float('average_fare');
            $table->string('average_travel_time');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('routes');
	}

}
