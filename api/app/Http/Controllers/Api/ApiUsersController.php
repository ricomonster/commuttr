<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Http\Requests;
use Commuttr\Http\Controllers\Controller;
use Commuttr\Repositories\Users\UserRepositoryInterface;
use Input;

class ApiUsersController extends Controller {
    protected $users;
    public function __construct(UserRepositoryInterface $users)
    {
        $this->users = $users;
    }

    public function create()
    {
        // get details
        $email      = Input::get('email');
        $password   = Input::get('password');
        $name       = Input::get('name');

        // validate
        $messages = $this->users->validateUserCreate($name, $email, $password);

        // check if there are errors
        if (count($messages) > 0) {
            return $this->setStatusCode(400)
                ->respondWithError($messages);
        }

        // create
        $user = $this->users->create($name, $email, $password);

        // return a response
        return $this->respond([
            'results' => [
                'user' => $user->toArray()]]);
    }
}
