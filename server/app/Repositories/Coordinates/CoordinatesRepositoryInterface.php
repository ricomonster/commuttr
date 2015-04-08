<?php //-->
namespace Commuttr\Repositories\Coordinates;

interface CoordinatesRepositoryInterface
{
    public function create($routeId, $coordinates);
    public function findCoordinates($routeId);
    public function update($routeId, $coordinates);
}
