<?php

namespace Commuttr\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;

    const OK_REQUEST = 200;

    const BAD_REQUEST = 400;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;

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
        return response()->json($message, $this->getStatusCode());
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
