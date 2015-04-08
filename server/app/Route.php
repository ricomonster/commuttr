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
    protected $fillable = ['contributor_id', 'route_name', 'to', 'from', 'vice_versa'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['coordinates'];

    /**
     * The attributes/accessors that will be accessed via JSON or array
     *
     * @var array
     */
    protected $appends = ['markers'];

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
     * Customized the structure for the tags
     *
     * @return array
     */
    public function getMarkersAttribute()
    {
        // get tags
        $coordinates = $this->relations['coordinates'];
        // check if there
        if(!isset($coordinates)) {
            return [];
        }

        // check if tags is not empty
        if(!empty($coordinates)) {
            $markers = [];

            foreach($coordinates as $key => $coordinate) {
                $markers[$key]['latitude'] = $coordinate->latitude;
                $markers[$key]['longitude'] = $coordinate->longitude;
            }

            return $markers;
        }
    }
}
