<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Repositories\Coordinates\CoordinatesRepositoryInterface;
use Commuttr\Repositories\Route\RouteRepositoryInterface;
use Input;

class ApiRoutesController extends ApiController
{
    protected $coordinates;
    protected $routes;

    public function __construct(CoordinatesRepositoryInterface $coordinates, RouteRepositoryInterface $routes)
    {
        $this->coordinates  = $coordinates;
        $this->routes       = $routes;
    }

    public function create()
    {
        $contributorId  = Input::get('contributor_id');
        $routeName      = Input::get('route_name');
        $to             = Input::get('to');
        $from           = Input::get('from');
        $coordinates    = Input::get('coordinates');

        // validate
        $messages = $this->routes->validateCreate($routeName, $to, $from);

        // check if there are errors
        if (count($messages) > 1) {
            // return error
            return $this->setStatusCode(400)
                ->respondWithError($messages);
        }

        // create route
        $route = $this->routes->create($contributorId, $routeName, $to, $from, 0);
        // create coordinates
        $coordinates = $this->coordinates->create($route->id, $coordinates);

        // return results
        return $this->respond([
            'data' => [
                'coordinates' => $coordinates->toArray(),
                'routes' => $route->toArray()]]);
    }

    public function search()
    {
        $query = Input::get('query');

        if (empty($query)) {
            // return error
            return $this->setStatusCode(400)
                ->respondWithError('No keyword provided.');
        }

        // search for the query
        $results = $this->routes->search($query);

        // return results
        return $this->respond([
            'data' => [
                'results' => $results->toArray()]]);
    }
}
