<?php

namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class ViaRoutes extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'via_routes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['route_id', 'location'];

    /**
     * Route/Via Routes Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function route()
    {
        return $this->belongsTo('Commuttr\Route', 'route_id');
    }
}
