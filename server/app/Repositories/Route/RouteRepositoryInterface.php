<?php //-->
namespace Commuttr\Repositories\Route;

/**
 * Interface RouteRepositoryInterface
 * @package Commuttr\Repositories\Route
 */
interface RouteRepositoryInterface
{

    /**
     * Create a new route
     *
     * @param $contributorId
     * @param $name
     * @param $to
     * @param $from
     * @param $modeOfTransportation
     * @param $averageFare
     * @param $averageTravelTime
     * @param $viceVersa
     * @return mixed
     */
    public function create($contributorId, $name, $to, $from, $modeOfTransportation, $averageFare, $averageTravelTime, $viceVersa);

    /**
     * Return all routes
     *
     * @return mixed
     */
    public function all();

    /**
     * Fetches a route using its ID
     *
     * @param $routeId
     * @return mixed
     */
    public function findById($routeId);

    /**
     * Searches a route based on some parameters
     *
     * @param $query
     * @return mixed
     */
    public function search($query);

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
    public function update($routeId, $name, $to, $from, $viceVersa, $coordinates);

    /**
     * Determine if given route is valid to create
     *
     * @param $name
     * @param $to
     * @param $from
     * @return \Illuminate\Support\MessageBag
     */
    public function validateCreate($name, $to, $from);
}
