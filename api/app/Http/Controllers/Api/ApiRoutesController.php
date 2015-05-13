<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Repositories\Routes\RouteRepositoryInterface;
use Input;

class ApiRoutesController extends ApiController {
    protected $routes;

    public function __construct(RouteRepositoryInterface $routes)
    {
        $this->routes = $routes;
    }

    public function all()
    {
        return $this->respond([
            'data' => [
                'routes' => $this->routes->all()]]);
    }

    public function create()
    {
        // get the parameters
        $user                   = Input::get('user_id');
        $name                   = Input::get('name');
        $details                = Input::get('detail');
        $from                   = Input::get('from');
        $to                     = Input::get('to');
        $via                    = Input::get('via');
        $viceVersa              = Input::get('vice_versa');
        $coordinates            = Input::get('coordinates');
        $modeOfTransportation   = Input::get('mode_of_transportation');

        // validate
        $messages = $this->routes->validCreate($name, $from, $to, $coordinates);

        // check if there are errors
        if (count($messages) > 0) {
            // return error messages
            return $this->setStatusCode(400)
                ->respondWithError($messages);
        }

        // validate the coordinates
        $validCoordinates = $this->validateCoordinates($coordinates);

        // check if the coordinates are valid
        if (count($validCoordinates) > 0) {
            // return an error message
            return $this->setStatusCode(400)
                ->respondWithError($validCoordinates);
        }

        // create the route
        $route = $this->routes->create($user, $name, $details, $from, $to, $via,
            $viceVersa, $modeOfTransportation, $coordinates);

        // return the newly created route
        return $this->respond([
            'data' => [
                'route' => $route->toArray()]]);
    }

    public function search()
    {
        $keyword = Input::get('keyword');

        // perform search
        $results = $this->routes->search($keyword);

        // return a response
        return $this->respond([
            'data' => [
                'results' => $results->toArray()]]);
    }

    protected function validateCoordinates($coordinates)
    {
        $message = [];

        // check if variable is an array
        if (!is_array($coordinates)) {
            return ['coordinates' => 'Invalid request format. Coordinates should be in array.'];
        }

        foreach ($coordinates as $coordinate) {
            // check first if there's an index latitude or longitude
            if (!isset($coordinate['latitude']) || !isset($coordinate['longitude'])) {
                // no latitude or longitude
                // set error
                $message['coordinates'] = 'Coordinates should have a latitude and longitude';
                // break the loop
                break;
            }

            // check if the format of the latitude or longitude is valid
            if (!is_numeric($coordinate['latitude']) || !is_numeric($coordinate['longitude'])) {
                // set error
                $message['coordinates'] = 'Invalid latitude or longitude format.';
                // break the loop
                break;
            }
        }

        return $message;
    }
}
