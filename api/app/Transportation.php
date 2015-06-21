<?php

namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Transportation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transportations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['vehicle_type'];

    /**
     * Route Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function routes()
    {
        return $this->hasMany('Commuttr\Route', 'route_transportation', 'transportation_id', 'route_id');
    }
}