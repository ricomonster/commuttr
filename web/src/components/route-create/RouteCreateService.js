(function() {
    'use strict';

    angular.module('commuttrApp.components.routeCreate')
        .factory('RouteCreateService', ['$http', 'AuthService', 'CONFIG', RouteCreateService]);

    function RouteCreateService($http, AuthService, CONFIG) {
        return {
            create: function (name, destination, origin, viceVersa, viaRoutes, vehicles, coordinates) {
                // prepare the data to be sent to the API
                var data = 'route_name=' + (name || '') + '&destination=' + (destination || '') +
                    '&origin=' + (origin || '') + '&vice_versa=' + (viceVersa || 0);

                // check if there are vice versa routes added
                if (viaRoutes.length > 0) {
                    // loop to get the routes and append to the data
                    for (var r in viaRoutes) {
                        if (viaRoutes[r].location.length > 0) {
                            data += '&via_route[]=' + viaRoutes[r].location;
                        }
                    }
                }

                // check if there are vehicles added
                if (vehicles.length > 0) {
                    // loop to get the vehicles and append to the data
                    for (var v in vehicles) {
                        data += '&mode_of_transportation[]=' + vehicles[v].id;
                    }
                }

                // check if there coordinates given
                if (coordinates.length > 0) {
                    // loop to the get the coordinates
                    for (var c = 0; c < coordinates.length; c++) {
                        data += '&coordinates[' + c + '][latitude]=' + coordinates[c].latitude +
                        '&coordinates[' + c + '][longitude]=' + coordinates[c].longitude;
                    }
                }

                return $http.post(CONFIG.API_URL + 'routes/create?user_id=' +
                AuthService.user().id, data);
            },
            transportation : function() {
                return $http.get(CONFIG.API_URL + 'transportation/vehicle_lists');
            },
            vehicles : function(id) {
                return $http.get(CONFIG.API_URL + 'vehicles/lists?user_id=' + id);
            }
        }
    }
})();
