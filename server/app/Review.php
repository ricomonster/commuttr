<?php namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'reviews';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['route_id', 'user_id', 'title', 'content'];

    /**
     * Review/Route Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function route()
    {
        return $this->belongsTo('Commuttr\Route', 'route_id');
    }

    /**
     * Review/Route Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('Commuttr\User', 'user_id');
    }
}
