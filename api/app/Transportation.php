<?php namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Transportation extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transportation';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['transportation'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('created_at', 'updated_at', 'pivot');

    /**
     * Route relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function route()
    {
        return $this->belongsToMany('Commuttr\Route', 'route_transportation', 'transportation_id', 'route_id');
    }
}
