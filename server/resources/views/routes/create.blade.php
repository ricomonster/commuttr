@extends('layout')

@section('content')
    <main class="container-fluid search-routes-page">
        <div class="row">
            <div class="col-md-9">
                <div id="map_canvas"></div>
            </div>
            <div class="col-md-3" style="overflow: auto; padding: 10px 15px;">
                <div class="map-controls">
                    <a href="#" class="btn btn-danger" id="clear_markers">Clear Markers</a>
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

                    <div class="form-group">
                        <label class="control-label">Mode of Transportation:</label>
                        <select name="mode_of_transportation" class="form-control">
                            <option value="" selected>-- Select --</option>
                            <option value="BUS">BUS</option>
                            <option value="UV EXPRESS">UV EXPRESS</option>
                            <option value="JEEPNEY">JEEPNEY</option>
                            <option value="BUS OR JEEPNEY">BUS OR JEEPNEY</option>
                            <option value="BUS OR UV EXPRESS">BUS OR UV EXPRESS</option>
                            <option value="UV EXPRESS OR JEEPNEY">UV EXPRESS OR JEEPNEY</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Average Fare:</label>
                        <input type="name" name="average_fare" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Average Travel Time:</label>
                        <input type="name" name="average_travel_time" class="form-control"/>
                    </div>

                    <div class="checkbox">
                        <label><input type="checkbox" name="vice_versa"> Vice-versa route</label>
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
//        var markers = [];
//        var getRoute = function() {
//            $.ajax({
//                type : 'get',
//                url : '/api/v1.0/routes/get_route?route_id=2',
//                dataType : 'json'
//            }).done(function(response) {
//                if (response.data) {
//                    markers = response.data.route.coordinates;
//                    getCurrentLocation();
//                }
//            });
//        };
//
//        var getCurrentLocation = function() {
//            if (navigator.geolocation) {
//                navigator.geolocation.getCurrentPosition(getGoogleMaps);
//            }
//        };
//
//        var getGoogleMaps = function(position) {
//            var mapOptions = {
//                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//                zoom: 10,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            };
//
//            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//            var infoWindow = new google.maps.InfoWindow();
//            var lat_lng = new Array();
//            var latlngbounds = new google.maps.LatLngBounds();
//
//            for (var i = 0; i < markers.length; i++) {
//                var data = markers[i];
//                var myLatlng = new google.maps.LatLng(data.latitude, data.longitude);
//                lat_lng.push(myLatlng);
//                var marker = new google.maps.Marker({
//                    position: myLatlng,
//                    map: map,
//                    title: data.title
//                });
//                latlngbounds.extend(marker.position);
//                (function (marker, data) {
//                    google.maps.event.addListener(marker, "click", function (e) {
//                        infoWindow.setContent(data.description);
//                        infoWindow.open(map, marker);
//                    });
//                })(marker, data);
//            }
//
//            map.setCenter(latlngbounds.getCenter());
//            map.fitBounds(latlngbounds);
//
//            //***********ROUTING****************//
//
//            //Initialize the Path Array
//            var path = new google.maps.MVCArray();
//
//            //Initialize the Direction Service
//            var service = new google.maps.DirectionsService();
//
//            //Set the Path Stroke Color
//            var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
//
//            //Loop and Draw Path Route between the Points on MAP
//            for (var i = 0; i < lat_lng.length; i++) {
//                if ((i + 1) < lat_lng.length) {
//                    var src = lat_lng[i];
//                    var des = lat_lng[i + 1];
//                    path.push(src);
//                    poly.setPath(path);
//                    service.route({
//                        origin: src,
//                        destination: des,
//                        travelMode: google.maps.DirectionsTravelMode.DRIVING
//                    }, function (result, status) {
//                        if (status == google.maps.DirectionsStatus.OK) {
//                            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
//                                path.push(result.routes[0].overview_path[i]);
//                            }
//                        }
//                    });
//                }
//            }
//        };
//
//        getRoute();

        var directionsService;
        var directionsRenderer;
        var map;

        var initialize = function(position) {
            var position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer();
            map = new google.maps.Map(document.getElementById("map_canvas"), {
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: position
            });

            directionsRenderer.setMap(map);

            google.maps.event.addListener(map, 'click', function(event) {
                addWayPointToRoute(event.latLng);
            });
        };

        var markers = [];
        var polylines = [];
        var isFirst = true;

        var addWayPointToRoute = function(location) {
            if (isFirst) {
                addFirstWayPoint(location);
                isFirst = false;
            } else {
                appendWayPoint(location);
            }
        };

        var addFirstWayPoint = function(location) {
            var request = {
                origin: location,
                destination: location,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: response.routes[0].legs[0].start_location,
                        map: map,
                        draggable : true
                    });
                    marker.arrayIndex = 0;
                    markers.push(marker);
                    google.maps.event.addListener(marker, 'dragend', function() {
                        recalculateRoute(marker);
                    });
                }
            });
        };

        var appendWayPoint = function(location) {
            var request = {
                origin: markers[markers.length - 1].position,
                destination: location,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: response.routes[0].legs[0].end_location,
                        map: map,
                        draggable : true
                    });

                    markers.push(marker);

                    marker.arrayIndex = markers.length - 1;
                    google.maps.event.addListener(marker, 'dragend', function() {
                        recalculateRoute(marker);
                    });

                    var polyline = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
                    var path = response.routes[0].overview_path;
                    for (var x in path) {
                        polyline.getPath().push(path[x]);
                    }

                    polyline.setMap(map);
                    polylines.push(polyline);
                }
            });
        };

        var recalculateRoute = function(marker) {
            //recalculate the polyline to fit the new position of the dragged marker

            if (marker.arrayIndex > 0) {
                //its not the first so recalculate the route from previous to this marker
                polylines[marker.arrayIndex - 1].setMap(null);

                var request = {
                    origin: markers[marker.arrayIndex - 1].position,
                    destination: marker.position,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var polyline = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
                        var path = response.routes[0].overview_path;
                        for (var x in path) {
                            polyline.getPath().push(path[x]);
                        }

                        polyline.setMap(map);
                        polylines[marker.arrayIndex - 1] = polyline;
                    }
                });
            }

            if (marker.arrayIndex < markers.length - 1) {
                //its not the last, so recalculate the route from this to next marker
                polylines[marker.arrayIndex].setMap(null);

                var request = {
                    origin: marker.position,
                    destination: markers[marker.arrayIndex + 1].position,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        var polyline = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
                        var path = response.routes[0].overview_path;
                        for (var x in path) {
                            polyline.getPath().push(path[x]);
                        }

                        polyline.setMap(map);
                        polylines[marker.arrayIndex] = polyline;
                    }
                });
            }
        };

        var placeMarker = function(location) {
            var request = {
                origin: location,
                destination: location,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var marker = new google.maps.Marker({
                        position: response.routes[0].legs[0].start_location,
                        map: map
                    });
                }
            });
        };

        var getCoordinates = function() {
            var coordinates = [];

            // get coordinates
            for (var m = 0; m < markers.length; m++) {
                coordinates.push({
                    'latitude'  : markers[m].getPosition().lat(),
                    'longitude' : markers[m].getPosition().lng()
                });
            }

            return coordinates;
        };

        var clearTheMap = function() {
            // remove markers
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            // remove the polyline
            for (var k = 0; k < polylines.length; k++) {
                polylines[k].setMap(null);
            }

            markers = [], polylines = [];
        }

        $('#create_route').on('submit', function(e) {
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/api/v1.0/routes/create',
                data : {
                    contributor_id      : $(this).find('input[name="contributor_id"]').val(),
                    route_name          : $(this).find('input[name="route_name"]').val(),
                    to                  : $(this).find('input[name="to"]').val(),
                    from                : $(this).find('input[name="from"]').val(),
                    average_fare        : $(this).find('input[name="average_fare"]').val(),
                    average_travel_time : $(this).find('input[name="average_travel_time"]').val(),
                    coordinates         : getCoordinates(),
                    vice_versa          : ($(this).find('input[name="vice_versa"]').is(":checked")) ? 1 : 0,
                    mode_of_transportation : $(this).find('select[name="mode_of_transportation"]').val()
                }
            }).done(function(response) {
                if (response.data) {
                    clearTheMap();
                    alert('Route '+ response.data.route.route_name + ' was successfully created');
                }
            });
        });

        $('#clear_markers').on('click', function(e) {
            e.preventDefault();
            clearTheMap();
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initialize);
        }
    </script>
@stop
