(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .controller('RoutesCreateController',
            ['RoutesComponentService', RoutesCreateController]);

    function RoutesCreateController(RoutesComponentService) {
        var self = this;

        self.vehicleLists = {};
        self.createRoute = {};

        // get list of vehicles
        RoutesComponentService.vehicles()
            .success(function(response) {
                if (response.vehicles) {
                    self.vehicleLists = response.vehicles;
                }
            })
            .error(function() {

            });
    }
})();
