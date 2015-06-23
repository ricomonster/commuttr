<?php //-->
namespace Commuttr\Http\Controllers;

use Illuminate\Http\Request;
use Commuttr\Http\Requests;
use Auth, Validator;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        // validate login credentials
        $messages = $this->validateLogin($request);

        // check if there are errors
        if (count($messages) > 0) {
            // return error messages
            return $this->setStatusCode(self::BAD_REQUEST)
                ->respondWithError($messages);
        }

        // validate if given credentials are valid
        if (Auth::once([
            'email' => $request->input('email'),
            'password' => $request->input('password')])) {
            // return user details
            return $this->respond([
                'user' => Auth::user()]);
        }

        // invalid credentials, send an error message
        return $this->setStatusCode(self::UNAUTHORIZED)
            ->respondWithError([
                'auth' => ['Invalid email or password.']]);
    }

    protected function validateLogin($request)
    {
        // set rules
        $rules = [
            'email' => 'required',
            'password' => 'required'];

        // set the messages
        $messages = [
            'email.required' => 'We need your email.',
            'password.required' => 'We also need your password.'];

        // validate
        $validator = Validator::make($request->all(), $rules, $messages);
        $validator->passes();

        // return error messages
        return $validator->errors();
    }
}
