<?php

namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Coordinates extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'coordinates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['route_id', 'latitude', 'longitude'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['id', 'route_id', 'created_at', 'updated_at'];
}
