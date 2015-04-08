<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Repositories\User\UserRepositoryInterface;
use Input, Request;

class ApiAuthController extends ApiController
{
    protected $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function login()
    {
        $key        = Input::get('key');
        $password   = Input::get('password');

        if (empty($key) || empty($password)) {
            return $this->setStatusCode(400)
                ->respondWithError('Empty credentials');
        }

        // attempt to login the user
        $authenticate = $this->users->login($key, $password);

        if ($authenticate) {
            // return success response
            return $this->respond([
                'data' => [
                    'redirect_url' => Request::root()
                ]
            ]);
        }

        // authentication is not successful due to email or username is not found
        // or password is incorrect
        return $this->setStatusCode(401)
            ->respondWithError('Incorrect email/username or password');
    }
}
