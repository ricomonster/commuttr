(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleCreate')
        .factory('VehicleCreateService', ['$http', 'CONFIG', VehicleCreateService]);

    function VehicleCreateService($http, CONFIG) {
        return {
            create : function(userId, vehicleName, plateNumber, transportation, details) {
                return $http.post(CONFIG.API_URL + 'vehicles/create?user_id=' + userId,
                    'vehicle_name=' + (vehicleName || '') + '&plate_number=' +
                    (plateNumber || '') + '&transportation_id=' + (transportation || '') +
                    '&details=' + (details || ''));
            },
            transportation : function() {
                return $http.get(CONFIG.API_URL + 'transportation/vehicle_lists');
            }
        }
    }
})();
