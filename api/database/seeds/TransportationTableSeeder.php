<?php

use Illuminate\Database\Seeder;
use Commuttr\Transportation;

class TransportationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $vehicles = ['jeepney', 'tricycle', 'uv express', 'bus', 'train'];

        foreach ($vehicles as $vehicle) {
            Transportation::firstOrCreate([
                'vehicle_type' => $vehicle]);
        }
    }
}
