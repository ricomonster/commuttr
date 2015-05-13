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

    /**
     * User/Routes Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contributor()
    {
        return $this->belongsTo('Commuttr\User', 'user_id');
    }

    /**
     * Coordinates Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function coordinates()
    {
        return $this->hasMany('Commuttr\Coordinate');
    }

    /**
     * Transportation relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function transportation()
    {
        return $this->belongsToMany('Commuttr\Transportation', 'route_transportation', 'route_id', 'transportation_id');
    }
}
