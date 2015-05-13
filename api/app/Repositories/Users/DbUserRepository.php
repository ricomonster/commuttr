<?php //-->
namespace Commuttr\Repositories\Users;

use Commuttr\User;
use Auth, Hash, Validator;

class DbUserRepository implements UserRepositoryInterface {
    /**
     * Creates a new user
     *
     * @param $name
     * @param $email
     * @param $password
     * @return User
     */
    public function create($name, $email, $password)
    {
        return User::create([
            'name'      => $name,
            'email'     => $email,
            'password'  => Hash::make($password)]);
    }

    /**
     * Finds a user by its ID
     *
     * @param $id
     * @return User
     */
    public function findById($id)
    {
        return User::find($id);
    }

    /**
     * Finds a user by its email
     *
     * @param $email
     * @return User
     */
    public function findByEmail($email)
    {
        return User::where('email', '=', $email)->first();
    }

    /**
     * Update user details
     *
     * @param $id
     * @param $name
     * @param $email
     * @return User
     */
    public function updateDetails($id, $name, $email)
    {
        // fetch the user
        $user = $this->findById($id);

        // update its details
        $user->name = $name;
        $user->email = $email;
        $user->save();

        return $user;
    }

    /**
     * Update users password
     *
     * @param $id
     * @param $password
     * @return User
     */
    public function updatePassword($id, $password)
    {
        $user = $this->findById($id);

        // update the password
        $user->password = Hash::make($password);
        $user->save();
    }

    /**
     * Deletes a user
     *
     * @param $id
     * @return void
     */
    public function delete($id)
    {

    }

    /**
     * Determine if the given data is valid to be saved
     *
     * @param $name
     * @param $email
     * @param $password
     * @return \Illuminate\Support\MessageBag
     */
    public function validateUserCreate($name, $email, $password)
    {
        return $this->validateUser($name, $email, $password);
    }

    /**
     * Determine if the given data is valid to be updated
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $password
     * @return \Illuminate\Support\MessageBag
     */
    public function validateUserUpdate($id, $name, $email, $password)
    {
        return $this->validateUser($name, $email, $password, $id);
    }

    protected function validateUser($name, $email, $password, $id = null)
    {
        // prepare the data
        $data = [
            'name'      => $name,
            'email'     => $email,
            'password'  => $password];

        // prepare the rules
        $rules = [
            'name'      => 'required',
            'email'     => 'required|unique:users,email',
            'password'  => 'required|min:6'];

        // customize the messages
        $messages = [
            'name.required'     => 'We need your name',
            'email.required'    => 'We need your email',
            'email.unique'      => 'Your email is already taken',
            'password.required' => 'We need your password',
            'password.min'      => 'Your password should be :min+ characters'];

        // check if id is set
        if ($id) {
            $rules['email'] .= ','.$id;
        }

        // validate
        $validator = Validator::make($data, $rules, $messages);
        $validator->passes();

        return $validator->errors();
    }

    /**
     * Authenticates the user and logged it in
     *
     * @param $email
     * @param $password
     * @param $api
     * @return boolean
     */
    public function login($email, $password, $api)
    {
        // check first if the request is from 3rd party source (ex. mobile app)
        if ($api) {
            // this will only validate the credentials
            return Auth::validate(['email' => $email, 'password' => $password]);
        }

        // validate and save session
        return Auth::attempt(['email' => $email, 'password' => $password]);
    }
}
