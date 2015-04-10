<?php //-->
namespace Commuttr\Repositories\Review;

/**
 * Interface ReviewRepositoryInterface
 * @package Commuttr\Repositories\Review
 */
interface ReviewRepositoryInterface
{
    /**
     * Creates a new review for a route
     *
     * @param $routeId
     * @param $userId
     * @param $title
     * @param $content
     * @return mixed
     */
    public function create($routeId, $userId, $title, $content);

    /**
     * Find a review
     *
     * @param $id
     * @return mixed
     */
    public function findById($id);

    /**
     * Fetch all review for a specific route
     *
     * @param $routeId
     * @return mixed
     */
    public function findByRoute($routeId);

    /**
     * Determine if the given details are valid to create
     *
     * @param $title
     * @param $content
     * @return mixed
     */
    public function validateReviewCreate($title, $content);
}
