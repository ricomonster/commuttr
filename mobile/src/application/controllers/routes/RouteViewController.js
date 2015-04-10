CommuttrApp.controller('RouteViewController', ['$ionicLoading', '$scope', '$stateParams', '$window', 'RouteService', function($ionicLoading, $scope, $stateParams, $window, RouteService) {
    $scope.route = {};

    // show loader
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var initialize = function() {
        findRoute(function() {
            // get coordinates
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(plotRoute);
            }
        });
    };

    var findRoute = function(callback) {
        var routeId = $stateParams.routeId;

        // call an API request
        RouteService.get(routeId).success(function(response) {
            if (response.data) {
                $scope.route = response.data.route;
                callback();
            }
        });
    };

    var plotRoute = function(userPosition) {
        // set the markers
        var mapOptions = {
            center: new google.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions),
            infoWindow = new google.maps.InfoWindow(),
            latitudeLongitude = [],
            latitudeLongitudeBounds = new google.maps.LatLngBounds();

        // get markers from the route scope
        var markers = $scope.route.coordinates;

        for (var i = 0; i < markers.length; i++) {
            var data = markers[i],
                myLatlng = new google.maps.LatLng(data.latitude, data.longitude);

            latitudeLongitude.push(myLatlng);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });

            latitudeLongitudeBounds.extend(marker.position);
            //
            //(function (marker, data) {
            //    google.maps.event.addListener(marker, "click", function (e) {
            //        infoWindow.setContent(data.description);
            //        infoWindow.open(map, marker);
            //    });
            //})(marker, data);
        }

        map.setCenter(latitudeLongitudeBounds.getCenter());
        map.fitBounds(latitudeLongitudeBounds);

        // ROUTES
        // Initialize the Path Array
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
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
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

                    $ionicLoading.hide();
                });
            }
        }
    };

    initialize();
}]);
