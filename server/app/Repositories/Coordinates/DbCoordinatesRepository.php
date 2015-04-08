<?php //-->
namespace Commuttr\Repositories\Coordinates;

use Commuttr\Coordinates;

class DbCoordinatesRepository implements CoordinatesRepositoryInterface
{
    public function create($routeId, $coordinates)
    {
        foreach ($coordinates as $coordinate) {
            // create coordinate
            Coordinates::create([
                'route_id'  => $routeId,
                'latitude'  => $coordinate['latitude'],
                'longitude' => $coordinate['longitude']]);
        }

        return $this->findCoordinates($routeId);
    }

    public function findCoordinates($routeId)
    {
        // fetch coordinates for a specific route
        return Coordinates::where('route_id', '=', $routeId)->get();
    }

    public function update($routeId, $coordinates)
    {

    }
}
