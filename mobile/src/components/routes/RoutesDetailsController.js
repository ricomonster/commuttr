(function() {
    'use strict';

    angular.module('commutrMobile.components.routes')
        .controller('RoutesDetailsController', [
            '$stateParams', 'RoutesComponentService', 'StorageService',
            RoutesDetailsController]);

    function RoutesDetailsController($stateParams, RoutesComponentService, StorageService) {
        var self = this,
            id = $stateParams.id;

        self.route = [];

        // fetch route details from API
        RoutesComponentService.getRoute(id)
            .success(function(response) {
                if (response.routes) {
                    self.route = response.routes;

                    // initialize google maps
                    self.loadGoogleMaps();
                }
            });

        self.loadGoogleMaps = function() {
            var latitudeLongitude = [],
                latitudeLongitudeBounds = new google.maps.LatLngBounds(),
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom : 16,
                    mapTypeId : google.maps.MapTypeId.ROADMAP
                });

            var coordinates = self.route.coordinates;

            for (var i = 0; i < coordinates.length; i++) {
                latitudeLongitude.push(new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude));
                // set map bounds
                latitudeLongitudeBounds.extend(new google.maps.LatLng(coordinates[i].latitude, coordinates[i].longitude));
            }

            map.setCenter(latitudeLongitudeBounds.getCenter());
            map.fitBounds(latitudeLongitudeBounds);
            // routes
            // initialize the path array
            var path = new google.maps.MVCArray();
            // Initialize the Direction Service
            var directionService = new google.maps.DirectionsService();
            // Set the Path Stroke Color
            var polyline = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
            //Loop and Draw Path Route between the Points on MAP
            for (var i = 0; i < latitudeLongitude.length; i++) {
                if ((i + 1) < latitudeLongitude.length) {
                    //var src = latitudeLongitude[i],
                    //    des = latitudeLongitude[i + 1]
                    var request = {
                        origin: latitudeLongitude[i],
                        destination: latitudeLongitude[i + 1],
                        travelMode: google.maps.DirectionsTravelMode.DRIVING,
                    };
                    directionService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            var way = response.routes[0].overview_path;
                            for (var x in way) {
                                polyline.getPath().push(way[x]);
                            }
                            polyline.setMap(map);
                            path.push(polyline);
                        }
                    });
                }
            }
        };
    }
})();
