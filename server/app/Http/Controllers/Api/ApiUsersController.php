<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Repositories\User\UserRepositoryInterface;
use Input;

class ApiUsersController extends ApiController
{
    protected $users;

    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function create()
    {
        // get parameters
        $email      = Input::get('email');
        $username   = Input::get('username');
        $password   = Input::get('password');
        $name       = Input::get('name');

        // validate
        $messages = $this->users->validateCreate($name, $email, $username, $password);

        if (count($messages) > 0) {
            return $this->setStatusCode(400)
                ->respondWithError($messages);
        }

        // create user
        $user = $this->users->create($name, $email, $username, $password);

        return $this->respond([
            'data' => [
                'user' => $user->toArray()]]);
    }
}
