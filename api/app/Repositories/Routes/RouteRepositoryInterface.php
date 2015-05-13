<?php //-->
namespace Commuttr\Repositories\Routes;

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
     * @param $transportationIds
     * @param $coordinates
     * @return Route
     */
    public function create($user, $name, $details, $from, $to, $via, $viceVersa, $transportationIds, $coordinates);

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
     * @param $keyword
     * @return Route
     */
    public function search($keyword);

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
     * @param $coordinates
     * @return Route
     */
    public function update($id, $user, $name, $details, $from, $to, $via, $viceVersa, $coordinates);

    /**
     * Determine if the given data is valid to create a route
     *
     * @param $name
     * @param $from
     * @param $to
     * @param $coordinates
     * @return \Illuminate\Support\MessageBag
     */
    public function validCreate($name, $from, $to, $coordinates);

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
    public function validUpdate($id, $name, $from, $to, $coordinates);
}
