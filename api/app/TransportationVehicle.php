<?php namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class TransportationVehicle extends Model {
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transportation_vehicles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['vehicle'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];
}
