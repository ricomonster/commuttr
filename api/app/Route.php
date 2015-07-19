<?php //-->
namespace Commuttr;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
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
    protected $fillable = ['user_id', 'route_name', 'details', 'origin', 'destination',
        'vice_versa', 'views'];

    /**
     * User/Route Relationship
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
        return $this->hasMany('Commuttr\Coordinates');
    }

    /**
     * Transportation Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function modeOfTransportation()
    {
        return $this->belongsToMany('Commuttr\Transportation', 'route_transportation', 'route_id', 'transportation_id');
    }

    /**
     * Vehicle Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function vehicles()
    {
        return $this->belongsToMany('Commuttr\Vehicle', 'vehicle_routes', 'route_id', 'vehicle_id');
    }

    /**
     * Via Routes Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function viaRoutes()
    {
        return $this->hasMany('Commuttr\ViaRoutes');
    }
}
