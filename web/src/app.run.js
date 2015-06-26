(function() {
    'use strict';

    angular.module('commuttrApp.run')
        .run(['$http', run])
        .run(['$window', 'StorageService', getUserCoordinates]);

    function run($http) {
        // change post header content type
        $http.defaults.headers.post = {
            'Accept' : '*/*',
            'Content-Type' : 'application/x-www-form-urlencoded'
        };
    }

    function getUserCoordinates($window, StorageService) {
        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords);
                // save location coordinates in the local storage
                StorageService.set('coordinates', {
                    'longitude' : position.coords.longitude,
                    'latitude' : position.coords.latitude,
                });
            }, function(error) {
                console.log(error.message);
            }, {
                enableHighAccuray : true, timeout : 5000
            });
        }
    }
})();
