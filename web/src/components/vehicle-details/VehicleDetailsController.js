(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleDetails')
        .controller('VehicleDetailsController', ['$stateParams', 'VehicleDetailsService', VehicleDetailsController]);

    function VehicleDetailsController($stateParams, VehicleDetailsService) {
        var self = this;
        self.vehicle = [];

        // fetch vehicle details
        VehicleDetailsService.detail($stateParams.vehicle_id)
            .success(function(response) {
                if (response.vehicle) {
                    self.vehicle = response.vehicle;
                }
            })
    }
})();
