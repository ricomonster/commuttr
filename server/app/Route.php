<?php //-->
namespace Commuttr;

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
    protected $fillable = ['contributor_id', 'route_name', 'to', 'from', 'mode_of_transportation',
        'vice_versa', 'average_fare', 'average_travel_time'];

    /**
     * Coordinates Relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function coordinates()
    {
        return $this->hasMany('Commuttr\Coordinates');
    }
}
