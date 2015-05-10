<?php namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Route extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'routes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'name', 'details', 'from', 'to', 'via',
        'vice_versa'];
}
