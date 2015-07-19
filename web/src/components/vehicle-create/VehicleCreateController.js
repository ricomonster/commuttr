(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleCreate')
        .controller('VehicleCreateController', [
            '$mdDialog', '$rootScope', 'AuthService', 'ToastService', 'VehicleCreateService',
            VehicleCreateController]);

    function VehicleCreateController($mdDialog, $rootScope, AuthService, ToastService,
                                     VehicleCreateService) {
        var self = this;

        self.errors = [];
        self.transportationList = [];
        self.user = AuthService.user();
        self.vehicle = [];

        VehicleCreateService.transportation()
            .success(function(response) {
                if (response.vehicles) {
                    self.transportationList = response.vehicles;
                }
            });

        /**
         * Close the dialog window
         */
        self.closeDialog = function(event) {
            event.preventDefault();

            $mdDialog.cancel();
        };

        /**
         *
         */
        self.createVehicle = function() {
            var vehicle = self.vehicle;

            self.errors = [];

            // show loader
            ToastService.show('Saving...');

            // do an API call
            VehicleCreateService
                .create(self.user.id, vehicle.vehicle_name, vehicle.plate_number,
                    vehicle.transportation, vehicle.details)
                .success(function(response) {
                    if (response.vehicle) {
                        // close dialog
                        $mdDialog.cancel();

                        // empty the scope
                        self.vehicle = [];

                        // show success message
                        ToastService.show('You have successfully added a vehicle.', 5000);

                        // broadcast
                        $rootScope.$broadcast('new-vehicle-added');
                    }
                })
                .error(function(response) {
                    ToastService.show('Something went wrong.', 5000);

                    if (response.errors.message) {
                        ToastService.show(response.error.message, 5000);
                    }

                    self.errors = response.errors;
                })
        };
    }
})();
