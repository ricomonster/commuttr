@extends('layout')

@section('css')
    <style type="text/css">
        .create-routes-page .map-wrapper #map_canvas {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        .create-routes-page .form-wrapper { overflow: auto; padding-bottom: 15px; }
    </style>
@stop
@section('content')
    <main class="create-routes-page container-fluid">
        <div class="row">
            <section class="col-md-9 map-wrapper">
                <div id="map_canvas"></div>
            </section>
            <section class="col-md-3 form-wrapper">
                <h3>Create a new route</h3>

                <form id="create_route_form" method="post">
                    <div class="form-group">
                        <label class="control-label">Route name:</label>
                        <input type="text" name="name" class="form-control"
                        placeholder="Ex. Malabon, Acacia, Hulo"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">From:</label>
                        <input type="text" name="from" class="form-control"
                        placeholder="Ex. SM Hypermarket, Caloocan City"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">To:</label>
                        <input type="text" name="to" class="form-control"
                        placeholder="Ex. Malabon City"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Via:</label>
                        <input type="text" name="via" class="form-control"
                        placeholder="Ex. Acacia, Hulo"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Details:</label>
                        <textarea name="details" class="form-control" placeholder="Tell us something about this route"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Mode of Transportation:</label>
                        @foreach($vehicles as $vehicle)
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="mode_of_transportation[]"
                                value="{{ $vehicle->id }}">
                                {{ ucwords($vehicle->transportation) }}
                            </label>
                        </div>
                        @endforeach
                    </div>
                    <div class="form-group">
                        <label class="control-label">Vice versa:</label>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="vice-versa" value="1">
                                Is this a vice versa route?
                            </label>
                        </div>
                    </div>

                    <input type="hidden" name="user_id" value="{{ Auth::user()->id  }}"/>
                    <button type="submit" class="btn btn-primary btn-block">Create</button>
                </form>
            </section>
        </div>
    </main>
@stop
@section('footer.js')
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
        var ScribbleCreate = {
            directionsService : '',
            directionsRenderer : '',
            map : '',
            markers : [],
            polylines : [],
            isFirst : true,
            initialize : function() {
                // get user coordinates
                if (navigator.geolocation) {
                    // render the map
                    navigator.geolocation.getCurrentPosition(this.initializeGoogleMap);
                }

                this.bindEvents();
            },
            bindEvents : function() {
                $('#create_route_form').on('submit', this.submitNewRoute);
            },
            initializeGoogleMap : function(navigator) {
                var self = ScribbleCreate,
                    position = new google.maps.LatLng(navigator.coords.latitude, navigator.coords.longitude);

                // declare services
                self.directionsService = new google.maps.DirectionsService();
                self.directionsRenderer = new google.maps.DirectionsRenderer();

                // set the map
                self.map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom : 16,
                    mapTypeId : google.maps.MapTypeId.ROADMAP,
                    center : position
                });

                // enable direction renderer
                self.directionsRenderer.setMap(self.map);

                // add an event listener for creating markers
                google.maps.event.addListener(self.map, 'click', function(event) {
                    // add waypoint
                    self.addWayPointToRoute(event.latLng);
                });
            },
            addWayPointToRoute : function(location) {
                var self = ScribbleCreate;

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
            },
            addFirstWayPoint : function(location) {
                var self = ScribbleCreate;

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
            },
            appendWayPoint : function(location) {
                var self = ScribbleCreate;

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
            },
            // recalculate the polyline to fit the new position of the dragged marker
            recalculateRoute : function(marker) {
                var self = ScribbleCreate;

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
            },
            submitNewRoute : function(event) {
                event.preventDefault();

                var self = ScribbleCreate,
                    $this = $(this);

                $.ajax({
                    type : 'post',
                    url : '/api/v0.2/routes/create',
                    data : {
                        name : $this.find('input[name="name"]').val(),
                        details : $this.find('textarea[name="details"]').text(),
                        from : $this.find('input[name="from"]').val(),
                        to : $this.find('input[name="to"]').val(),
                        via : $this.find('input[name="via"]').val(),
                        vice_versa : $this.find('input[name="vice-versa"]:checked').val(),
                        coordinates : self.getCoordinates(),
                        mode_of_transportation : self.getModesOfTransportation(),
                        user_id : $this.find('input[name="user_id"]').val()
                    },
                    dataType : 'json'
                }).done(function(response) {
                    if (response.data) {
                        // reset the form
                        $this[0].reset();

                        // reset the map contents
                        self.resetMapContents();

                        // show success message
                        alert('Route '+ response.data.route.route_name + ' was successfully created');
                    }
                }).error(function(response) {
                    var messages = response.responseJSON.messages;
                });
            },
            getCoordinates : function() {
                var self = ScribbleCreate,
                    coordinates = [];

                if (self.markers.length < 0) {
                    return [];
                }

                // get coordinates
                for (var m = 0; m < self.markers.length; m++) {
                    coordinates.push({
                        'latitude'  : self.markers[m].getPosition().lat(),
                        'longitude' : self.markers[m].getPosition().lng()
                    });
                }

                return coordinates;
            },
            getModesOfTransportation : function() {
                // get checked modes of transportation
                var transportations = $('input[name="mode_of_transportation[]"]:checked').map(function() {
                    return this.value;
                }).get();

                return transportations;
            },
            resetMapContents : function() {
                var self = ScribbleCreate;

                // remove markers
                for (var i = 0; i < self.markers.length; i++) {
                    self.markers[i].setMap(null);
                }

                // remove the polyline
                for (var k = 0; k < self.polylines.length; k++) {
                    self.polylines[k].setMap(null);
                }

                self.markers = [], self.polylines = [];
            }
        };

        ScribbleCreate.initialize();
    </script>
@stop
