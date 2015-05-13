<?php namespace Commuttr\Http\Controllers;

use Commuttr\Http\Requests;
use Commuttr\Transportation;

class RoutesController extends Controller {
    public function create()
    {
        return view('routes.create', [
            // temporary
            'vehicles' => Transportation::orderBy('transportation', 'ASC')->get()
        ]);
    }

    public function search()
    {
        return view('routes.search');
    }
}
