<?php namespace Commuttr\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Response;

abstract class Controller extends BaseController {
	use DispatchesCommands, ValidatesRequests;

    protected $statusCode = 200;

    /**
     * Returns the status code
     *
     * @return int
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Returns a response message
     *
     * @param $message
     * @return mixed
     */
    public function respond($message)
    {
        return Response::json($message, $this->getStatusCode());
    }

    /**
     * Returns an error response and message
     *
     * @param $message
     * @return mixed
     */
    public function respondWithError($message)
    {
        return $this->respond([
            'errors' => [
                'message' => $message]]);
    }

    /**
     * Sets the status code
     *
     * @param $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }
}
