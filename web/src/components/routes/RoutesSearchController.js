(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .controller('RoutesSearchController', [
            '$state', '$stateParams', 'RoutesComponentService', 'ToastService', 'StorageService',
            RoutesSearchController]);

    function RoutesSearchController($state, $stateParams, RoutesComponentService, ToastService,
                                    StorageService) {
        var self = this;

        self.map                = '';
        self.results            = [];
        self.showResults        = false;
        self.keyword            = $stateParams.keyword;
        self.showRouteDetails   = false;
        self.routeDetails       = [];

        // map variables
        var path, directionService, polyline;

        // do search using keyword to the API
        RoutesComponentService.search($stateParams.keyword)
            .success(function(response) {
                if (response.results.length > 0) {
                    self.results = response.results;
                    self.showResults = true;

                    // load the map
                    self.loadRoute(self.results[0].coordinates);
                }

                // no results
                ToastService.hide();
            })
            .error(function(response) {

            });

        self.goToRouteDetails = function(route) {
            self.showRouteDetails = true;
            self.routeDetails = route;

            self.initializeMaps();
            // load the route
            self.loadRoute(route.coordinates);
        };

        self.goBackToResults = function() {
            self.showRouteDetails = false;
        };

        self.initializeMaps = function() {
            ToastService.show('Loading...');

            var coordinates = StorageService.get('coordinates'),
                position = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);

            // set the map
            self.map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom                : 16,
                mapTypeId           : google.maps.MapTypeId.ROADMAP,
                center              : position,
                mapTypeControl      : false,
                streetViewControl   : false
            });
        };

        self.loadRoute = function(coordinates) {
            var latitudeLongitude = [],
                latitudeLongitudeBounds = new google.maps.LatLngBounds();

            for (var i = 0; i < coordinates.length; i++) {
                latitudeLongitude.push(new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude));
                // set map bounds
                latitudeLongitudeBounds.extend(new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude));
            }

            self.map.setCenter(latitudeLongitudeBounds.getCenter());
            self.map.fitBounds(latitudeLongitudeBounds);

            // routes
            // initialize the path array
            path = new google.maps.MVCArray();

            // Initialize the Direction Service
            directionService = new google.maps.DirectionsService();

            // Set the Path Stroke Color
            polyline = new google.maps.Polyline({ map: self.map, strokeColor: '#4986E7' });

            //Loop and Draw Path Route between the Points on MAP
            for (var i = 0; i < latitudeLongitude.length; i++) {
                if ((i + 1) < latitudeLongitude.length) {
                    //var src = latitudeLongitude[i],
                    //    des = latitudeLongitude[i + 1]
                    var request = {
                        origin: latitudeLongitude[i],
                        destination: latitudeLongitude[i + 1],
                        travelMode: google.maps.DirectionsTravelMode.TRANSIT
                    };

                    directionService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            var way = response.routes[0].overview_path;
                            for (var x in way) {
                                polyline.getPath().push(way[x]);
                            }

                            polyline.setMap(self.map);
                            path.push(polyline);
                        }
                    });
                }
            }

            ToastService.hide();
        };

        self.initializeMaps();
    }
})();
