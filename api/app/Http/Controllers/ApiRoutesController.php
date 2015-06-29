<?php //-->
namespace Commuttr\Http\Controllers;

use Illuminate\Http\Request;
use Commuttr\Http\Requests;
use Commuttr\Coordinates;
use Commuttr\Route;
use Commuttr\ViaRoutes;
use Commuttr\User;
use Validator;

class ApiRoutesController extends Controller
{
    public function create(Request $request)
    {
        // validate first the request
        $messages = $this->validateRouteCreation($request);

        // check if there are errors
        if (count($messages) > 0) {
            // return the errors
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($messages);
        }

        // check if the user exists
        $user = User::where('id', '=', $request->input('user_id'))->first();

        if (empty($user)) {
            // user does not exists
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError('User does not exists.');
        }

        // validate the given coordinates
        $validCoordinates = $this->validateCoordinates($request->input('coordinates'));

        // check if there are errors
        if (count($messages) > 0) {
            // return the errors
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($validCoordinates);
        }

        // create route
        $route = Route::create([
            'user_id'       => $request->input('user_id'),
            'route_name'    => $request->input('route_name'),
            'details'       => $request->input('details'),
            'origin'        => $request->input('origin'),
            'destination'   => $request->input('destination'),
            'vice_versa'    => ($request->input('vice_versa')) ? 1 : 0]);

        // set modes of transportation
        $route->modeOfTransportation()
            ->sync($request->input('mode_of_transportation'));

        // save the coordinates
        foreach ($request->input('coordinates') as $coordinate) {
            Coordinates::create([
                'route_id'  => $route->id,
                'latitude'  => $coordinate['latitude'],
                'longitude' => $coordinate['longitude']]);
        }

        // check if the request has via_routes given
        if ($request->input('via_route')) {
            foreach ($request->input('via_route') as $viaRoute) {
                // create via_route
                ViaRoutes::create([
                    'route_id' => $route->id,
                    'location' => $viaRoute]);
            }
        }

        // get the complete details of the route along with its related models
        $route = Route::with(['contributor', 'coordinates', 'modeOfTransportation', 'viaRoutes'])
            ->where('id', '=', $route->id)
            ->first();

        return $this->respond([
            'route' => $route->toArray()]);
    }

    public function getRoute(Request $request)
    {
        $routeId = $request->input('route_id');

        // check if route_id is set
        if (!$routeId || empty($routeId)) {
            // return an error message
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError('Route ID is required.');
        }

        // get route
        $route = Route::with(['contributor', 'coordinates', 'modeOfTransportation',
            'viaRoutes'])
            ->where('id', '=', $routeId)
            ->first();

        // check if route exists
        if (empty($route)) {
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError('Route does not exists.');
        }

        // return routes
        return $this->respond(['routes' => $route->toArray()]);
    }

    public function searchRoutes(Request $request)
    {
        $keyword = $request->input('keyword');

        // perform query search
        $results = Route::with([
                'contributor', 'coordinates', 'modeOfTransportation', 'viaRoutes'])
            ->orWhere('route_name', 'LIKE', '%'.$keyword.'%')
            ->orWhere('details', 'LIKE', '%'.$keyword.'%')
            ->orWhere('destination', 'LIKE', '%'.$keyword.'%')
            ->get();

        // return results
        return $this->respond([
            'results' => $results->toArray()]);
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

    protected function validateRouteCreation($data)
    {
        // prepare the rules
        $rules = [
            'user_id'                   => 'required',
            'route_name'                => 'required|min:3',
            'origin'                    => 'required|min:3',
            'destination'               => 'required|min:3',
            'coordinates'               => 'required',
            'mode_of_transportation'    => 'required'];

        // prepare the custom messages
        $messages = [
            'user_id.required'                  => 'User ID is required',
            'route_name.required'               => 'We need the name of the route.',
            'route.min'                         => 'The route name should be :min+ characters.',
            'origin.required'                   => 'We need the origin or start of the route.',
            'origin.min'                        => 'Origin should be :min+ characters.',
            'destination.required'              => 'We need the destination of the route.',
            'destination.min'                   => 'Destination should be :min+ characters.',
            'coordinates.required'              => 'We need some coordinates for the route.',
            'mode_of_transportation.required'   => 'We need modes of transportation available for this route.'];

        // validate
        $validator = Validator::make($data->all(), $rules, $messages);
        $validator->passes();

        // return if there are errors encountered
        return $validator->errors();
    }
}
