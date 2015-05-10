<?php //-->
namespace Commuttr\Repositories\Users;

/**
 * Interface UsersRepositoryInterface
 * @package Commuttr\Repositories\Users
 */
interface UserRepositoryInterface {
    /**
     * Creates a new user
     *
     * @param $name
     * @param $email
     * @param $password
     * @return User
     */
    public function create($name, $email, $password);

    /**
     * Finds a user by its ID
     *
     * @param $id
     * @return User
     */
    public function findById($id);

    /**
     * Finds a user by its email
     *
     * @param $email
     * @return User
     */
    public function findByEmail($email);

    /**
     * Update user details
     *
     * @param $id
     * @param $name
     * @param $email
     * @return User
     */
    public function updateDetails($id, $name, $email);

    /**
     * Update users password
     *
     * @param $id
     * @param $password
     * @return User
     */
    public function updatePassword($id, $password);

    /**
     * Deletes a user
     *
     * @param $id
     * @return void
     */
    public function delete($id);

    /**
     * Determine if the given data is valid to be saved
     *
     * @param $name
     * @param $email
     * @param $password
     * @return \Illuminate\Support\MessageBag
     */
    public function validateUserCreate($name, $email, $password);

    /**
     * Determine if the given data is valid to be updated
     *
     * @param $id
     * @param $name
     * @param $email
     * @param $password
     * @return \Illuminate\Support\MessageBag
     */
    public function validateUserUpdate($id, $name, $email, $password);

    /**
     * Authenticates the user and logged it in
     *
     * @param $email
     * @param $password
     * @param $api
     * @return boolean
     */
    public function login($email, $password, $api);
}
