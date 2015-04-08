@extends('layout')

@section('content')
    <main class="container-fluid search-routes-page">
        <div class="row">
            <div class="col-md-9">
                <div id="map_canvas"></div>
            </div>
            <div class="col-md-3">
                <div class="map-controls">
                    <a href="#" class="btn btn-danger">Clear Markers</a>
                </div>

                <h3>Create a new route</h3>

                <form method="post" id="create_route">
                    <div class="form-group">
                        <label class="control-label">Route name:</label>
                        <input type="name" name="route_name" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label">From:</label>
                        <input type="name" name="from" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label">To:</label>
                        <input type="name" name="to" class="form-control"/>
                    </div>

                    <div class="checkbox">
                        <label><input type="checkbox"> Vice-versa route</label>
                    </div>

                    <input type="hidden" name="contributor_id" value="{{ Auth::user()->id }}"/>

                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </main>
@stop

@section('footer.js')
    <script src="http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script type="text/javascript">
        var CommuttrRouterCreator = {
            init : function() {
                // get users' location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.loadGoogleMap);
                }
            },
            loadGoogleMap : function() {

            }
        };
//        var directionsService;
//        var directionsRenderer;
//        var map;
//
//        var initialize = function(position) {
//            var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//
//            directionsService = new google.maps.DirectionsService();
//            directionsRenderer = new google.maps.DirectionsRenderer();
//            map = new google.maps.Map(document.getElementById("map_canvas"), {
//                zoom: 16,
//                mapTypeId: google.maps.MapTypeId.ROADMAP,
//                center: position
//            });
//
//            directionsRenderer.setMap(map);
//
//            google.maps.event.addListener(map, 'click', function(event) {
//                addWayPointToRoute(event.latLng);
//            });
//        };
//
//        var markers = [];
//        var polylines = [];
//        var isFirst = true;
//
//        var addWayPointToRoute = function(location) {
//            if (isFirst) {
//                addFirstWayPoint(location);
//                isFirst = false;
//            } else {
//                appendWayPoint(location);
//            }
//        };
//
//        var addFirstWayPoint = function(location) {
//            var request = {
//                origin: location,
//                destination: location,
//                travelMode: google.maps.DirectionsTravelMode.DRIVING
//            };
//
//            directionsService.route(request, function(response, status) {
//                if (status == google.maps.DirectionsStatus.OK) {
//                    var marker = new google.maps.Marker({
//                        position: response.routes[0].legs[0].start_location,
//                        map: map,
//                        draggable : true
//                    });
//                    marker.arrayIndex = 0;
//                    markers.push(marker);
//                    google.maps.event.addListener(marker, 'dragend', function() {
//                        recalculateRoute(marker);
//                    });
//                }
//            });
//        };
//
//        var appendWayPoint = function(location) {
//            var request = {
//                origin: markers[markers.length - 1].position,
//                destination: location,
//                travelMode: google.maps.DirectionsTravelMode.DRIVING
//            };
//
//            directionsService.route(request, function(response, status) {
//                if (status == google.maps.DirectionsStatus.OK) {
//                    var marker = new google.maps.Marker({
//                        position: response.routes[0].legs[0].end_location,
//                        map: map,
//                        draggable : true
//                    });
//
//                    markers.push(marker);
//
//                    marker.arrayIndex = markers.length - 1;
//                    google.maps.event.addListener(marker, 'dragend', function() {
//                        recalculateRoute(marker);
//                    });
//
//                    var polyline = new google.maps.Polyline();
//                    var path = response.routes[0].overview_path;
//                    for (var x in path) {
//                        polyline.getPath().push(path[x]);
//                    }
//
//                    polyline.setMap(map);
//                    polylines.push(polyline);
//                }
//            });
//        };
//
//        var recalculateRoute = function(marker) {
//            //recalculate the polyline to fit the new position of the dragged marker
//
//            if (marker.arrayIndex > 0) {
//                //its not the first so recalculate the route from previous to this marker
//                polylines[marker.arrayIndex - 1].setMap(null);
//
//                var request = {
//                    origin: markers[marker.arrayIndex - 1].position,
//                    destination: marker.position,
//                    travelMode: google.maps.DirectionsTravelMode.DRIVING
//                };
//
//                directionsService.route(request, function(response, status) {
//                    if (status == google.maps.DirectionsStatus.OK) {
//                        var polyline = new google.maps.Polyline();
//                        var path = response.routes[0].overview_path;
//                        for (var x in path) {
//                            polyline.getPath().push(path[x]);
//                        }
//
//                        polyline.setMap(map);
//                        polylines[marker.arrayIndex - 1] = polyline;
//                    }
//                });
//            }
//
//            if (marker.arrayIndex < markers.length - 1) {
//                //its not the last, so recalculate the route from this to next marker
//                polylines[marker.arrayIndex].setMap(null);
//
//                var request = {
//                    origin: marker.position,
//                    destination: markers[marker.arrayIndex + 1].position,
//                    travelMode: google.maps.DirectionsTravelMode.DRIVING
//                };
//
//                directionsService.route(request, function (response, status) {
//                    if (status == google.maps.DirectionsStatus.OK) {
//                        var polyline = new google.maps.Polyline();
//                        var path = response.routes[0].overview_path;
//                        for (var x in path) {
//                            polyline.getPath().push(path[x]);
//                        }
//
//                        polyline.setMap(map);
//                        polylines[marker.arrayIndex] = polyline;
//                    }
//                });
//            }
//        };
//
//        var placeMarker = function(location) {
//            var request = {
//                origin: location,
//                destination: location,
//                travelMode: google.maps.DirectionsTravelMode.DRIVING
//            };
//
//            directionsService.route(request, function(response, status) {
//                if (status == google.maps.DirectionsStatus.OK) {
//                    var marker = new google.maps.Marker({
//                        position: response.routes[0].legs[0].start_location,
//                        map: map
//                    });
//                }
//            });
//        };
//
//        var getCoordinates = function() {
//            var coordinates = [];
//
//            // get coordinates
//            for (var m = 0; m < markers.length; m++) {
//                coordinates.push({
//                    'latitude'  : markers[m].getPosition().lat(),
//                    'longitude' : markers[m].getPosition().lng()
//                });
//            }
//
//            return coordinates;
//        };
//
//        $('#create_route').on('submit', function(e) {
//            e.preventDefault();
//
//            $.ajax({
//                type : 'post',
//                url : '/api/v1.0/routes/create',
//                data : {
//                    contributor_id  : $(this).find('input[name="contributor_id"]').val(),
//                    route_name      : $(this).find('input[name="route_name"]').val(),
//                    to              : $(this).find('input[name="to"]').val(),
//                    from            : $(this).find('input[name="from"]').val(),
//                    coordinates     : getCoordinates()
//                }
//            })
//        });
//
//        if (navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(initialize);
//        }
    </script>
@stop
