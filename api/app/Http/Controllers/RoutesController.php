<?php namespace Commuttr\Http\Controllers;

use Commuttr\Http\Requests;
use Commuttr\Repositories\Routes\RouteRepositoryInterface;
use Commuttr\Transportation;
use Input;

class RoutesController extends Controller {
    protected $routes;

    public function __construct(RouteRepositoryInterface $routes)
    {
        $this->routes = $routes;
    }

    public function create()
    {
        return view('routes.create', [
            // temporary
            'vehicles' => Transportation::orderBy('transportation', 'ASC')->get()
        ]);
    }

    public function detail($id)
    {
        // get route
        $route = $this->routes->findById($id);
    }

    public function search()
    {
        $query = Input::get('query');

        return view('routes.search', [
            'query' => $query,
            'routes' => $this->routes->search($query)]);
    }
}
