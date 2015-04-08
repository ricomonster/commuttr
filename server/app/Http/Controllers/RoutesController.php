<?php //-->
namespace Commuttr\Http\Controllers;

class RoutesController extends Controller {
    public function create()
    {
        return view('routes.create');
    }

    public function search()
    {
        return view('routes.search');
    }
}
