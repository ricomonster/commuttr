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
}
