<?php //-->
namespace Commuttr\Http\Controllers;

use Illuminate\Http\Request;
use Commuttr\Http\Requests;
use Commuttr\User;
use Hash, Validator;

class ApiUsersController extends Controller
{
    public function create(Request $request)
    {
        // validate first if the needed fields are provided in the request
        $messages = $this->validateUserCreation($request);

        // check if there are errors
        if (count($messages) > 0) {
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($messages);
        }

        // create the user
        $user = User::create([
            'name'      => $request->input('name'),
            'email'     => $request->input('email'),
            'password'  => Hash::make($request->input('password')),
            'type'      => $request->input('type')]);

        // return user details
        return $this->respond([
            'user' => $user->toArray()]);
    }

    public function getUser(Request $request)
    {
        $userId = $request->input('user_id');

        // check if user id is set
        if (!$userId || empty($userId)) {
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError('User ID is required.');
        }

        // check if the user exists
        $user = User::where('id', '=', $userId)->first();

        if (empty($user)) {
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError('User does not exists.');
        }

        // return user details
        return $this->respond([
            'user' => $user->toArray()]);
    }

    public function update(Request $request)
    {
        $userId = $request->input('user_id');

        // validate
        $messages = $this->validateUpdateDetails($request);

        // check if there are errors
        if (count($messages) > 0) {
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($messages);
        }

        // check if the user exists
        $user = User::where('id', '=', $userId)->first();

        if (empty($user)) {
            return $this->setStatusCode(self::NOT_FOUND)
                ->respondWithError('User does not exists.');
        }

        // update details
        $user->email = $request->input('email');
        $user->name = $request->input('name');
        $user->save();

        // return a response
        return $this->respond([
            'user' => $user->toArray()]);
    }

    protected function validateUserCreation($data)
    {
        // prepare the rules
        $rules = [
            'name'      => 'required|min:2',
            'email'     => 'required|unique:users,email',
            'password'  => 'required|min:6',
            'type'      => 'required'];

        // prepare the messages
        $messages = [
            'name.required'     => 'Your name is required.',
            'name.min'          => 'Your name must be :min+ characters.',
            'email.required'    => 'Your email is required.',
            'email.unique'      => 'Your email is already taken.',
            'password.required' => 'Your password is required.',
            'password.min'      => 'Your password must be :min+ characters.',
            'type.required'     => 'Are you a commuter or driver?'];

        $validator = Validator::make($data->all(), $rules, $messages);
        $validator->passes();

        // return errors
        return $validator->errors();
    }

    protected function validateUpdateDetails($data)
    {
        // prepare the rules
        $rules = [
            'name' => 'required|min:2',
            'email' => 'required|unique:users,email,' . $data->input('id')];

        // prepare the messages
        $messages = [
            'name.required'     => 'Your name is required.',
            'name.min'          => 'Your name must be :min+ characters.',
            'email.required'    => 'Your email is required.',
            'email.unique'      => 'Your email is already taken.'];

        $validator = Validator::make($data->all(), $rules, $messages);
        $validator->passes();

        // return errors
        return $validator->errors();
    }
}
