<?php

use Commuttr\TransportationVehicle;
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

		 $this->call('TransportationVehicleTableSeeder');
	}

}

class TransportationVehicleTableSeeder extends Seeder {
    public function run()
    {
        // delete first contents of the table
        DB::table('transportation_vehicles')->delete();

        // set an array list of transportation vehicles
        $vehicles = ['bus', 'jeepney', 'uv express', 'train', 'tricycle'];

        foreach ($vehicles as $key => $vehicle) {
            TransportationVehicle::create(['vehicle' => $vehicle]);

            $this->command->info(strtoupper($vehicle) . ' successfully added');
        }
    }
}
