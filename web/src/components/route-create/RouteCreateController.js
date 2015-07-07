(function() {
    'use strict';

    angular.module('commuttrApp.components.routeCreate')
        .controller('RouteCreateController', [
            'AuthService', 'ToastService', 'StorageService', 'RouteCreateService',
            RouteCreateController]);

    function RouteCreateController(AuthService, ToastService, StorageService,
                                   RouteCreateService) {
        var self = this;

        self.vehicleLists = [];
        self.route = [];
        self.route.coordinates = [];
        self.route.vehicles = [];

        // instantiate via routes
        self.route.via_route = [{
            location : ''
        }];

        self.formErrors = [];

        // map variables
        self.directionsService = '';
        self.directionsRenderer = '';
        self.map = '';
        self.markers = [];
        self.polylines = [];
        self.isFirst = true;

        self.initialize = function() {
            // fetch the details of the user
            self.user = AuthService.user();

            // get lists of transportation vehicles
            RouteCreateService.transportation()
                .success(function(response) {
                    if (response.vehicles) {
                        self.vehicleLists = response.vehicles;
                    }
                });

            // run google maps
            self.initializeGoogleMaps();
        };

        /**
         * adds another input box for the via routes
         * @param $event
         */
        self.addViaRoute = function($event) {
            $event.preventDefault();

            // just create an empty object
            self.route.via_route.push({
                'location' : ''
            });
        };

        self.select = function(item, list) {
            var id = list.indexOf(item);

            if (id > -1) {
                list.splice(id, 1);
            } else {
                list.push(item);
            }
        };

        self.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };

        /**
         * submits the details of the new route created
         */
        self.submitRoute = function() {
            // build up the coordinates
            self.fetchCoordinates();

            // clear errors
            self.formErrors = [];

            var route = self.route;

            // send request to the API
            // name, destination, origin, viceVersa, viaRoutes, vehicles, coordinates
            RouteCreateService
                .create(route.route_name, route.destination, route.origin, route.vice_versa,
                route.via_route, route.vehicles, route.coordinates)
                .success(function(response) {
                    if (response.route) {
                        // clear the map and form
                        self.clearForm();

                        // show toaster
                        ToastService.show('You have successfully created the route.', 5000);
                    }
                })
                .error(function(response) {
                    // show errors in the form
                    ToastService.show('There are errors encountered.', 5000);

                    self.formErrors = response.errors;
                });
        };

        self.clearForm = function() {
            self.route = [];
            self.route.coordinates = [];
            self.route.vehicles = [];

            // clear via routes
            self.route.via_route = [{
                location : ''
            }];

            // reinitialize google maps
            self.initializeGoogleMaps();
        };

        /**
         * Loads up the Google Maps
         */
        self.initializeGoogleMaps = function() {
            var coordinates = StorageService.get('coordinates'),
                position = new google.maps.LatLng(coordinates.latitude, coordinates.longitude);

            // declare services
            self.directionsService = new google.maps.DirectionsService();
            self.directionsRenderer = new google.maps.DirectionsRenderer();

            // set the map
            self.map = new google.maps.Map(document.getElementById('map_canvas'), {
                zoom                : 16,
                mapTypeId           : google.maps.MapTypeId.ROADMAP,
                center              : position,
                mapTypeControl      : false,
                streetViewControl   : false
            });
            // enable direction renderer
            self.directionsRenderer.setMap(self.map);
            // add an event listener for creating markers
            google.maps.event.addListener(self.map, 'click', function(event) {
                // add waypoint
                self.addWayPointToRoute(event.latLng);
            });
        };

        /**
         *
         * @param location
         */
        self.addWayPointToRoute = function(location) {
            // check if this is the first marker
            if (self.isFirst) {
                // create the first waypoint
                self.addFirstWayPoint(location);
                // set it to false
                self.isFirst = false;
            } else {
                // append the new waypoint
                self.appendWayPoint(location);
            }
        };

        /**
         *
         * @param location
         */
        self.addFirstWayPoint = function(location) {
            var request = {
                origin      : location,
                destination : location,
                travelMode  : google.maps.DirectionsTravelMode.DRIVING
            };
            self.directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var marker = new google.maps.Marker({
                        position : response.routes[0].legs[0].start_location,
                        map : self.map,
                        draggable : true
                    });
                    marker.arrayIndex = 0;
                    self.markers.push(marker);
                    // add event listener if the user dragged the marker
                    google.maps.event.addListener(marker, 'dragend', function() {
                        self.recalculateRoute(marker);
                    });
                }
            });
        };

        /**
         *
         * @param location
         */
        self.appendWayPoint = function(location) {
            var request = {
                origin : self.markers[self.markers.length - 1].position,
                destination : location,
                travelMode : google.maps.DirectionsTravelMode.DRIVING
            };

            // send a request
            self.directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var marker = new google.maps.Marker({
                        position : response.routes[0].legs[0].end_location,
                        map : self.map,
                        draggable : true
                    });
                    // add the new marker
                    self.markers.push(marker);
                    marker.arrayIndex = self.markers.length - 1;
                    // add event listener if the user dragged the marker
                    google.maps.event.addListener(marker, 'dragend', function() {
                        self.recalculateRoute(marker);
                    });
                    // set the polyline
                    var polyline = new google.maps.Polyline({
                        map : self.map,
                        strokeColor : '#4986E7'
                    });
                    var path = response.routes[0].overview_path;
                    for (var x in path) {
                        polyline.getPath().push(path[x]);
                    }
                    // set the map
                    polyline.setMap(self.map);
                    // add the polyline
                    self.polylines.push(polyline);
                }
            });
        };

        /**
         * recalculate the polyline to fit the new position of the dragged marker
         * @param marker
         */
        self.recalculateRoute = function(marker) {
            if (marker.arrayIndex > 0) {
                // it's not the first so recalculate the route from previous to this marker
                self.polylines[marker.arrayIndex - 1].setMap(null);
                // set the request
                var request = {
                    origin : self.markers[marker.arrayIndex - 1].position,
                    destination : marker.position,
                    travelMode : google.maps.DirectionsTravelMode.DRIVING
                };
                self.directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var polyline = new google.maps.Polyline({
                            map : self.map,
                            strokeColor : '#4986E7'
                        });
                        var path = response.routes[0].overview_path;
                        for (var x in path) {
                            polyline.getPath().push(path[x]);
                        }
                        // set the polyline in the map
                        polyline.setMap(self.map);
                        self.polylines[marker.arrayIndex - 1] = polyline;
                    }
                });
            }
        };

        /**
         *
         */
        self.clearOverlays = function() {
            for (var i = 0; i < self.markers.length; i++ ) {
                self.markers[i].setMap(null);
            }

            self.markers.length = 0;
        };

        self.fetchCoordinates = function() {
            if (self.markers.length > 0) {
                // get coordinates
                for (var m = 0; m < self.markers.length; m++) {
                    self.route.coordinates.push({
                        'latitude' : self.markers[m].getPosition().lat(),
                        'longitude' : self.markers[m].getPosition().lng()
                    });
                }
            }
        };

        self.initialize();
    }
})();
