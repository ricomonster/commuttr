<?php //-->
use Commuttr\Repositories\Routes;

/**
 * Interface RouteRepositoryInterface
 */
interface RouteRepositoryInterface {
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
     * @param $coordinateIds
     * @return Route
     */
    public function create($user, $name, $details, $from, $to, $via, $viceVersa, $coordinateIds);

    /**
     * Returns all routes
     *
     * @return Route
     */
    public function all();

    /**
     * Returns a route using its ID
     *
     * @param $id
     * @return Route
     */
    public function findById($id);

    /**
     * Performs a route search based on the given query
     *
     * @param $query
     * @return Route
     */
    public function search($query);

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
     * @param $coordinateids
     * @return Route
     */
    public function update($id, $user, $name, $details, $from, $to, $via, $viceVersa, $coordinateids);

    /**
     * Determine if the given data is valid to create a route
     *
     * @param $name
     * @param $details
     * @param $from
     * @param $to
     * @param $coordinateIds
     * @return \Illuminate\Support\MessageBag
     */
    public function validCreate($name, $details, $from, $to, $coordinateIds);

    /**
     * Determine if the given data is valid to update a route
     *
     * @param $id
     * @param $name
     * @param $details
     * @param $from
     * @param $to
     * @param $coordinateIds
     * @return \Illuminate\Support\MessageBag
     */
    public function validUpdate($id, $name, $details, $from, $to, $coordinateIds);
}
