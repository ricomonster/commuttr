(function() {
    'use strict';

    angular.module('commuttrApp.components.vehicleList')
        .controller('VehicleListController', [
            '$state', '$mdDialog', 'AuthService', 'ToastService', 'VehicleListService',
            VehicleListController]);

    function VehicleListController($state, $mdDialog, AuthService, ToastService,
                                   VehicleListService) {
        var self = this;

        self.user = AuthService.user();
        self.vehicles = [];

        ToastService.show('Loading...');


        self.fetchVehicles = function() {
            // get users vehicles
            VehicleListService.lists(self.user.id)
                .success(function(response) {
                    if (response.vehicles) {
                        self.vehicles = response.vehicles;

                        // hide toast
                        ToastService.hide();
                    }
                });
        };

        /**
         * Redirects to the details page of the vehicle
         * @param vehicle
         */
        self.viewVehicleDetails = function(vehicle) {
            $state.go('vehicle.detail', {
                'vehicle_id' : vehicle.id });
        };

        /**
         * Shows dialog box containing to add a vehicle for the user
         */
        self.showAddVehicleForm = function(ev) {
            $mdDialog.show({
                templateUrl: 'app/components/vehicle-create/vehicle-create.html',
                parent: angular.element(document.body),
                targetEvent: ev
            }).then(function(answer) {

            }, function() {

            });
        };

        // fetch the user's vehicles
        self.fetchVehicles();
    }
})();
