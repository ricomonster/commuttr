(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleCreate')
        .controller('VehicleCreateController', [
            '$mdDialog', 'AuthService', 'ToastService', 'VehicleCreateService',
            VehicleCreateController]);

    function VehicleCreateController($mdDialog, AuthService, ToastService, VehicleCreateService) {
        var self = this;
        self.user = AuthService.user();
        self.vehicle = [];
        self.errors = [];

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

            // show loader
            ToastService.show('Saving...');

            // do an API call
            VehicleCreateService
                .create(self.user.id, vehicle.vehicle_name, vehicle.plate_number,
                    vehicle.details)
                .success(function(response) {
                    if (response.vehicle) {
                        // close dialog
                        // empty the scope
                        self.vehicle = [];

                        // show success message
                        ToastService.show('You have successfully added a vehicle.', 5000);

                        // broadcast
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
