<?php //-->
namespace Commuttr\Repositories\User;

use Commuttr\User;
use Auth, Hash, Validator;

class DbUserRepository implements UserRepositoryInterface
{
    /**
     * Creates a new user
     *
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @return mixed
     */
    public function create($name, $email, $username, $password)
    {
        return User::create([
            'name'      => $name,
            'email'     => $email,
            'username'  => $username,
            'password'  => Hash::make($password)]);
    }

    /**
     * Returns all user
     *
     * @return mixed
     */
    public function all()
    {
        return User::where('active', '=', 1)->get();
    }

    /**
     * Finds a user by its email
     *
     * @param $email
     * @return mixed
     */
    public function findByEmail($email)
    {
        return User::where('email', '=', $email)->first();
    }

    /**
     * Finds a user by its ID
     *
     * @param $id
     * @return mixed
     */
    public function findById($id)
    {
        return User::where('id', '=', $id)->first();
    }

    /**
     * Finds a user by its username
     *
     * @param $username
     * @return mixed
     */
    public function findByUsername($username)
    {
        return User::where('username', '=', $username)->first();
    }

    /**
     * Updates user details
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $username
     * @return mixed
     */
    public function update($id, $name, $email, $username)
    {
        $user = $this->findById($id);

        // update
        $user->name = $name;
        $user->email = $email;
        $user->username = $username;
        $user->save();

        return $user;
    }

    /**
     * Deactivates a user account
     *
     * @param $id
     * @return mixed
     */
    public function deactivate($id)
    {

    }

    /**
     * Logs in the user
     *
     * @param $key
     * @param $password
     * @return mixed
     */
    public function login($key, $password)
    {
        // check first if the key is username or email
        $parameters = (filter_var($key, FILTER_VALIDATE_EMAIL)) ?
            ['email' => $key, 'password' => $password] :
            ['username' => $key, 'password' => $password];

        if (Auth::attempt($parameters)) {
            return true;
        }

        return false;
    }

    /**
     * Determine if the given details are valid for creating a new user
     *
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @return mixed
     */
    public function validateCreate($name, $email, $username, $password)
    {
        return $this->validateUser($name, $email, $username, $password);
    }

    /**
     * Determine if the given user is valid for creation
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @return mixed
     */
    public function validateUpdate($id, $name, $email, $username, $password)
    {

    }

    /**
     * Determine if the given user data is valid.
     *
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @param null $id
     */
    protected function validateUser($name, $email, $username, $password, $id = null)
    {
        // prep data
        $data = [
            'email'     => $email,
            'username'  => $username,
            'password'  => $password,
            'name'      => $name];

        // prep the rules
        $rules = [
            'email'     => 'required|unique:users,email',
            'username'  => 'required|unique:users,username',
            'password'  => 'required|min:6',
            'name'      => 'required'];

        // check if id is set
        if ($id) {
            // add id to the email rules
            $rules['email'] .= ','.$id;
            $rules['username'] .= ','.$id;
        }

        // prep the messages for validation
        $messages = [
            'email.required'    => 'An email is required',
            'email.unique'      => 'Email is already taken',
            'username.required' => 'A username is required',
            'username.unique'   => 'Username is already',
            'password.required' => 'A password is required',
            'password.min'      => 'Password should be :min+ characters',
            'name.required'     => 'We need your name'];

        // validate
        $validator = Validator::make($data, $rules, $messages);
        $validator->passes();

        return $validator->errors();
    }
}
