<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Coordinate;
use Input;

class ApiCoordinatesController extends ApiController {
    public function getCoordinates()
    {
        $routeId = Input::get('route_id');

        return $this->respond([
            'data' => [
                'coordinates' => Coordinate::where('route_id', '=', $routeId)->get()]]);
    }
}
