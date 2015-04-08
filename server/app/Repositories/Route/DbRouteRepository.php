<?php //-->
namespace Commuttr\Repositories\Route;

use Commuttr\Route;
use Validator;

/**
 * Class DbRouteRepository
 * @package Commuttr\Repositories\Route
 */
class DbRouteRepository implements RouteRepositoryInterface
{
    /**
     * Creates a new route
     *
     * @param $name
     * @param $to
     * @param $from
     * @param $viceVersa
     * @return mixed
     */
    public function create($contributorId, $name, $to, $from, $viceVersa)
    {
        return Route::create([
            'contributor_id'    => $contributorId,
            'route_name'        => $name,
            'to'                => $to,
            'from'              => $from,
            'vice_versa'        => $viceVersa]);
    }

    /**
     * Return all routes
     *
     * @return mixed
     */
    public function all()
    {

    }

    /**
     * Fetches a route using its ID
     *
     * @param $routeId
     * @return mixed
     */
    public function findById($routeId)
    {
        return Route::with(['coordinates'])
            ->where('id', '=', $routeId)
            ->first();
    }

    /**
     * Searches a route based on some parameters
     *
     * @param $query
     * @return mixed
     */
    public function search($query)
    {
        return Route::with(['coordinates'])
            ->orWhere('route_name', 'LIKE', '%'.$query.'%')
            ->orWhere('to', 'LIKE', '%'.$query.'%')
            ->get();
    }

    /**
     * Updates route details
     *
     * @param $routeId
     * @param $name
     * @param $to
     * @param $from
     * @param $viceVersa
     * @param $coordinates
     * @return mixed
     */
    public function update($routeId, $name, $to, $from, $viceVersa, $coordinates)
    {

    }

    /**
     * Determine if given route is valid to create
     *
     * @param $name
     * @param $to
     * @param $from
     * @return \Illuminate\Support\MessageBag
     */
    public function validateCreate($name, $to, $from)
    {
        return $this->validateRoute($name, $to, $from);
    }

    protected function validateRoute($name, $to, $from, $routeId = null)
    {
        // prep data
        $data = [
            'route_name'    => $name,
            'to'            => $to,
            'from'          => $from];

        // prep the rules
        $rules = [
            'route_name'    => 'required',
            'to'            => 'required',
            'from'          => 'required'];

        // prep the custom messages
        $messages = [
            'route_name.required'   => 'Route name is required',
            'to.required'           => 'Destination place is required',
            'from.required'         => 'Place of origin is required'];

        // validate
        $validator = Validator::make($data, $rules, $messages);
        $validator->passes();

        return $validator->errors();
    }
}
