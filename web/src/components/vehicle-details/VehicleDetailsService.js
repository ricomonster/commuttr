(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleDetails')
        .factory('VehicleDetailsService', ['$http', 'CONFIG', VehicleDetailsService]);

    function VehicleDetailsService($http, CONFIG) {
        return {
            detail : function(id) {
                return $http.get(CONFIG.API_URL + 'vehicles/detail?vehicle_id=' + id);
            }
        }
    }
})();
