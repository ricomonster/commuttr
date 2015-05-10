<?php namespace Commuttr\Http\Controllers;

use Commuttr\Http\Requests;
use Commuttr\TransportationVehicle;

class RoutesController extends Controller {
    public function create()
    {
        return view('routes.create', [
            // temporary
            'vehicles' => TransportationVehicle::orderBy('vehicle', 'ASC')->get()
        ]);
    }

    public function search()
    {
        return view('routes.search');
    }
}
