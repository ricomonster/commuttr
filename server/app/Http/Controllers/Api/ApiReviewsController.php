<?php //-->
namespace Commuttr\Http\Controllers\Api;

use Commuttr\Repositories\Review\ReviewRepositoryInterface;
use Input;

class ApiReviewsController extends ApiController
{
    protected $reviews;

    public function __construct(ReviewRepositoryInterface $reviews)
    {
        $this->reviews = $reviews;
    }

    public function create()
    {
        $routeId    = Input::get('route_id');
        $userId     = Input::get('user_id');
        $title      = Input::get('title');
        $content    = Input::get('content');

        // check if route ID exists
        if (empty($routeId)) {
            return $this->setStatusCode(400)
                ->respondWithError('Route ID is not set');
        }

        // check if user ID exists
        if (empty($userId)) {
            return $this->setStatusCode(400)
                ->respondWithError('User ID is not set');
        }

        // validate entry
        $messages = $this->reviews->validateReviewCreate($title, $content);

        if (count($messages) > 0) {
            // send error
            return $this->setStatusCode(400)
                ->respondWithError($messages);
        }

        // create review
        $review = $this->reviews->create($routeId, $userId, $title, $content);

        // send response
        return $this->respond([
            'data' => [
                'review' => $review->toArray()]]);
    }
}
