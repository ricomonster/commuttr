(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleList')
        .factory('VehicleListService', ['$http', 'CONFIG', VehicleListService]);

    function VehicleListService($http, CONFIG) {
        return {
            lists : function(id) {
                return $http.get(CONFIG.API_URL + 'vehicles/lists?user_id=' + id);
            }
        };
    }
})();
