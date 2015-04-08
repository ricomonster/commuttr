<?php //-->
namespace Commuttr\Repositories\User;

/**
 * Interface UserRepositoryInterface
 * @package Commuttr\Repositories\User
 */
interface UserRepositoryInterface
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
    public function create($name, $email, $username, $password);

    /**
     * Returns all user
     *
     * @return mixed
     */
    public function all();

    /**
     * Finds a user by its email
     *
     * @param $email
     * @return mixed
     */
    public function findByEmail($email);

    /**
     * Finds a user by its ID
     *
     * @param $id
     * @return mixed
     */
    public function findById($id);

    /**
     * Finds a user by its username
     *
     * @param $username
     * @return mixed
     */
    public function findByUsername($username);

    /**
     * Updates user details
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $username
     * @return mixed
     */
    public function update($id, $name, $email, $username);

    /**
     * Deactivates a user account
     *
     * @param $id
     * @return mixed
     */
    public function deactivate($id);

    /**
     * Logs in the user
     *
     * @param $key
     * @param $password
     * @return mixed
     */
    public function login($key, $password);

    /**
     * Determine if the given details are valid for creating a new user
     *
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @return mixed
     */
    public function validateCreate($name, $email, $username, $password);

    /**
     * Determine if the given details are valid for updating user details
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $username
     * @param $password
     * @return mixed
     */
    public function validateUpdate($id, $name, $email, $username, $password);
}
