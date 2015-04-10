<?php //-->
namespace Commuttr\Repositories\Review;

use Commuttr\Review;
use Validator;

class DbReviewRepository implements ReviewRepositoryInterface
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
    public function create($routeId, $userId, $title, $content)
    {
        return Review::create([
            'route_id'  => $routeId,
            'user_id'   => $userId,
            'title'     => $title,
            'content'   => $content]);
    }

    /**
     * Find a review
     *
     * @param $id
     * @return mixed
     */
    public function findById($id)
    {
        return Review::find($id);
    }

    /**
     * Fetch all review for a specific route
     *
     * @param $routeId
     * @return mixed
     */
    public function findByRoute($routeId)
    {
        return Review::where('route_id', '=', $routeId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Determine if the given details are valid to create
     *
     * @param $title
     * @param $content
     * @return \Illuminate\Support\MessageBag
     */
    public function validateReviewCreate($title, $content)
    {
        return $this->validateReview($title, $content);
    }


    /**
     * @param $title
     * @param $content
     * @param null $id
     * @return \Illuminate\Support\MessageBag
     */
    protected function validateReview($title, $content, $id = null)
    {
        // prepare data
        $data = [
            'title' => $title,
            'content' => $content];

        // set rules
        $rules = [
            'title' => 'required',
            'content' => 'required'];

        // set custom message
        $messages = [
            'title.required' => 'Your review should hava a title',
            'content.required' => 'Please provide a content for your review'
        ];

        // validate
        $validator = Validator::make($data, $rules, $messages);
        $validator->passes();

        return $validator->errors();
    }
}
