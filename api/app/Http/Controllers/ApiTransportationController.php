<?php

namespace Commuttr\Http\Controllers;

use Illuminate\Http\Request;
use Commuttr\Http\Requests;
use Commuttr\Transportation;

class ApiTransportationController extends Controller
{
    public function vehicleList()
    {
        $vehicles = Transportation::all();

        return $this->respond([
            'vehicles' => $vehicles->toArray()]);
    }
}
