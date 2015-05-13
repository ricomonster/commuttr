<?php namespace Commuttr\Http\Controllers\Api;

use Commuttr\Http\Requests;
use Commuttr\Repositories\Users\UserRepositoryInterface;
use Input, Request;

class ApiAuthController extends ApiController {
    protected $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function login()
    {
        $email      = Input::get('email');
        $password   = Input::get('password');
        $request    = Input::get('request');

        // validate
        if (empty($email) || empty($password)) {
            return $this->setStatusCode(400)
                ->respondWithError('Empty email or password.');
        }

        // attempt to login the user
        $authenticate = $this->users->login($email, $password, ($request == 'api'));

        // send the response and the user details
        if ($authenticate) {
            // get the user
            $user = $this->users->findByEmail($email);

            // set the results
            // return the user details
            $results['user'] = $user->toArray();

            // check if the request is from the web, return with the redirect url
            if ($request == 'web') {
                $results['redirect_url'] = Request::root();
            }

            return $this->respond([
               'results' => $results]);
        }

        return $this->setStatusCode(400)
            ->respondWithError('Invalid email or password.');
    }
}
