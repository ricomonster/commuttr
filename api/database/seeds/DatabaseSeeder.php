<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		 $this->call('TransportationTableSeeder');
	}

}

class TransportationTableSeeder extends Seeder {
    public function run()
    {
        // delete first contents of the table
        DB::table('transportation')->delete();

        // set an array list of vehicles
        $vehicles = ['bus', 'jeepney', 'uv express', 'train', 'tricycle'];

        foreach ($vehicles as $key => $vehicle) {
            \Commuttr\Transportation::create(['transportation' => $vehicle]);

            $this->command->info(strtoupper($vehicle) . ' successfully added');
        }
    }
}
