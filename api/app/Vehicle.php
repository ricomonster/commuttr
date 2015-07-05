<?php

namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'vehicles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'transportation_id', 'vehicle_name', 'plate_number',
        'details', 'active'];

    /**
     * User/Vehicle Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function driver()
    {
        return $this->belongsTo('Commuttr\User', 'user_id');
    }

    /**
     * Vehicle/Transportation Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function transportationType()
    {
        return $this->hasOne('Commuttr\Transportation');
    }
}
