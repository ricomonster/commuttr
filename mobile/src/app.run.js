(function() {
    'use strict';

    angular.module('commutrMobile.run')
        .run(['$ionicPlatform', '$http', run])
        .run(['$window', 'StorageService', getUserCoordinates]);

    function run($ionicPlatform, $http) {
        // change post header content type
        $http.defaults.headers.post = {
            'Accept' : '*/*',
            'Content-Type' : 'application/x-www-form-urlencoded'
        };

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

    function getUserCoordinates($window, StorageService) {
        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
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
