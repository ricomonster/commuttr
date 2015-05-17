<?php //-->
namespace Commuttr\Repositories\Routes;

use Commuttr\Coordinate;
use Commuttr\Route;
use Validator;

class DbRouteRepository implements RouteRepositoryInterface {
    /**
     * Creates a new route
     *
     * @param $user
     * @param $name
     * @param $details
     * @param $from
     * @param $to
     * @param $via
     * @param $viceVersa
     * @param $transportationIds
     * @param $coordinates
     * @return Route
     */
    public function create($user, $name, $details, $from, $to, $via, $viceVersa, $transportationIds, $coordinates)
    {
        $route = Route::create([
            'user_id'       => $user,
            'name'          => $name,
            'details'       => $details,
            'from'          => $from,
            'to'            => $to,
            'via'           => $via,
            'vice_versa'    => ($viceVersa) ? 1 : 0
        ]);

        // set the transportation modes
        $route->transportation()->sync($transportationIds);

        // save the routes
        foreach ($coordinates as $coordinate) {
            Coordinate::create([
                'route_id'  => $route->id,
                'longitude' => $coordinate['longitude'],
                'latitude'  => $coordinate['latitude']
            ]);
        }

        return $route;
    }

    /**
     * Returns all routes
     *
     * @return Route
     */
    public function all()
    {

    }

    /**
     * Returns a route using its ID
     *
     * @param $id
     * @return Route
     */
    public function findById($id)
    {
        return Route::find($id);
    }

    /**
     * Performs a route search based on the given query
     *
     * @param $keyword
     * @return Route
     */
    public function search($keyword)
    {
        return Route::with(['coordinates', 'transportation'])
            ->orWhere('name', 'LIKE', '%' . $keyword . '%')
            ->orWhere('to', 'LIKE', '%' . $keyword . '%')
            ->get();
    }

    /**
     * Updates the details of a saved route
     *
     * @param $id
     * @param $user
     * @param $name
     * @param $details
     * @param $from
     * @param $to
     * @param $via
     * @param $viceVersa
     * @param $coordinateIds
     * @return Route
     */
    public function update($id, $user, $name, $details, $from, $to, $via, $viceVersa, $coordinateIds)
    {

    }

    /**
     * Determine if the given data is valid to create a route
     *
     * @param $name
     * @param $from
     * @param $to
     * @param $coordinates
     * @return \Illuminate\Support\MessageBag
     */
    public function validCreate($name, $from, $to, $coordinates)
    {
        return $this->validateRoute($name, $from, $to, $coordinates);
    }

    /**
     * Determine if the given data is valid to update a route
     *
     * @param $id
     * @param $name
     * @param $from
     * @param $to
     * @param $coordinates
     * @return \Illuminate\Support\MessageBag
     */
    public function validUpdate($id, $name, $from, $to, $coordinates)
    {

    }

    protected function validateRoute($name, $from, $to, $coordinates, $id = null)
    {
        // prepare the data
        $data = [
            'name' => $name,
            'from' => $from,
            'to' => $to,
            'coordinates' => $coordinates];

        // set the rules
        $rules = [
            'name'          => 'required',
            'from'          => 'required',
            'to'            => 'required|different:from',
            'coordinates'   => 'required'];

        // set custom messages
        $messages = [
            'name.required' => 'We need the name of the route.',
            'from.required' => 'Where this route started?',
            'to.required' => 'Where this route ends?',
            'to.same' => 'Start point and destination should not be the same.',
            'coordinates.required' => 'We need the coordinates to plot the route.'];

        // run validator
        $validator = Validator::make($data, $rules, $messages);
        $validator->passes();

        return $validator->errors();
    }
}
