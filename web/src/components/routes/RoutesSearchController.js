(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .controller('RoutesSearchController', [
            '$state', '$stateParams', '$window', 'RoutesComponentService', RoutesSearchController]);

    function RoutesSearchController($state, $stateParams, $window, RoutesComponentService) {
        var self = this;

        self.map = '';
        self.searchResults = {};
        self.showResults = false;
        self.openSaBusiness = true;

        // do search using keyword to the API
        RoutesComponentService.search($stateParams.keyword)
            .success(function(response) {
                if (response.results) {
                    self.searchResults = response.results;
                    self.showResults = true;

                    // trigger google maps
                    if ($window.navigator.geolocation) {
                        $window.navigator.geolocation.getCurrentPosition(function(position) {
                            startGoogleMaps(position);
                        }, function(error) {
                            console.log(error.message);
                        }, {
                            enableHighAccuray : true, timeout : 5000
                        });
                    }
                }
            })
            .error(function(response) {

            });

        var startGoogleMaps = function(navigator) {
            var position = new google.maps.LatLng(navigator.coords.latitude, navigator.coords.longitude);

            self.map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom : 16,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                center : position,
                mapTypeControl: false,
                streetViewControl: false,
            });

        };
    }
})();
