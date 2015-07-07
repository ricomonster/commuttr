<?php

namespace Commuttr\Http\Controllers;

use Commuttr\Http\Requests;
use Commuttr\Transportation;
use Commuttr\User;
use Commuttr\Vehicle;
use Illuminate\Http\Request;
use Validator;

class ApiVehiclesController extends Controller
{
    public function create(Request $request)
    {
        $userId = $request->input('user_id');

        // check if user_id is set
        if (!$userId || empty($userId)) {
            // return an error message
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError(['message' => 'User ID is required.']);
        }

        // check if user exists
        $user = User::where('id', '=', $userId)->first();

        // check if the user exists
        if (empty($user)) {
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError(['message' => 'User does not exists.']);
        }

        // validate
        $messages = $this->validateVehicleCreate($request);

        // check if there are errors
        if (count($messages) > 0) {
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($messages);
        }

        // check if the transportation_id is an integer
        // if the transportation_id is a string, create first the transportation
        // and get its ID
        $transportationId = $this->validateTransportation($request->input('transportation_id'));

        // create the vehicle
        $vehicle = Vehicle::create([
            'user_id'           => $user->id,
            'transportation_id' => $transportationId,
            'vehicle_name'      => $request->input('vehicle_name'),
            'plate_number'      => $request->input('plate_number'),
            'details'           => $request->input('details')]);

        // return the details of the vehicle
        return $this->respond([
            'vehicle' => $vehicle->toArray()]);
    }

    public function detail(Request $request)
    {
        // get vehicle_id
        $vehicleId = $request->input('vehicle_id');

        // check if vehicle_id is set or empty
        if (!$vehicleId || empty($vehicleId)) {
            // return an error message
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError(['message' => 'Vehicle ID is required']);
        }

        // check if vehicle_id exists
        $vehicle = Vehicle::where('id', '=', $vehicleId)->first();

        if (empty($vehicle)) {
            // return an error message
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError(['message' => 'Vehicle does not exists']);
        }

        // return vehicle details
        return $this->respond([
            'vehicle' => $vehicle->toArray()]);
    }

    public function lists(Request $request)
    {
        $userId = $request->input('user_id');

        // check if user_id is set
        if (!$userId || empty($userId)) {
            // return an error message
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError(['message' => 'User ID is required.']);
        }

        // check if user exists
        $user = User::where('id', '=', $userId)->first();

        // check if the user exists
        if (empty($user)) {
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError(['message' => 'User does not exists.']);
        }

        // get the vehicles of the user
        $vehicles = Vehicle::where('user_id', '=', $userId)->get();

        return $this->respond([
            'vehicles' => $vehicles->toArray()]);
    }

    protected function validateTransportation($transportation)
    {
        // check if transportation_id is integer
        if (is_int($transportation)) {
            // return ID
            return $transportation;
        }

        // check first if transportation already exists in the database
        $tranportationExists = Transportation::where('vehicle_type', '=', strtolower($transportation))->first();

        if (empty($tranportationExists)) {
            // create the transportation
            $newTransportation = Transportation::create([
                'vehicle_type' => $transportation]);

            // return the ID
            return $newTransportation->id;
        }

        // return the ID of the existing transportation
        return $tranportationExists->id;
    }

    protected function validateVehicleCreate($data)
    {
        // prepare the rules
        $rules = [
            'transportation_id' => 'required',
            'vehicle_name'      => 'required',
            'plate_number'      => 'required'];

        // prepare the custom messages
        $messages = [
            'transportation_id.required' => 'What type of transportation is your vehicle?',
            'vehicle_name.required' => 'Vehicle name is required.',
            'plate_number.required' => 'Vehicle plate number is required'];

        // validate
        $validator = Validator::make($data->all(), $rules, $messages);
        $validator->passes();

        // return error messages if there are
        return $validator->errors();
    }
}
