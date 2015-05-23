@extends('layout')

@section('css')
    <style type="text/css">
        .search-routes-page .route-lists { padding: 0; }
        .search-routes-page .route-lists .route { color: #333333; display: block; padding: 5px 15px 10px; }
        .search-routes-page .route-lists .route:hover { cursor: pointer; text-decoration: none; }

        .search-routes-page .route-lists .route.active { background-color: #eeeeee; }

        .search-routes-page .route-lists .route .btn { display: none; margin-top: 10px; }
        .search-routes-page .route-lists .route.active .btn { display: inline-block ; }

        .search-routes-page #map_canvas {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    </style>
@stop

@section('content')
    <main class="search-routes-page container-fluid">
        <div class="row">
            <section class="col-md-3 route-lists">
                @foreach($routes as $key => $route)
                <article class="route {{ ($key == 0) ? 'active' : null }}"
                data-route-id="{{ $route->id }}">
                    <h3>{{ $route->name }}</h3>
                    <div>
                        From <strong>{{ $route->from }}</strong>
                        to <strong>{{ $route->to }}</strong>
                    </div>

                    <button class="btn btn-primary view-more-details">View more details</button>
                </article>
                @endforeach
            </section>
            <section class="col-md-9">
                {{--<a href="#" class="btn btn-primary" style="position: fixed; top: 0; right: 0;">View more details</a>--}}
                <div id="map_canvas"></div>
            </section>
        </div>
    </main>
@stop
@section('footer.js')
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
        var ScribbleSearch = {
            map : '',
            polylines : [],
            init : function() {
                // get user coordinates
                if (navigator.geolocation) {
                    // render the map
                    navigator.geolocation.getCurrentPosition(this.initializeGoogleMap);
                }

                this.bindEvents();
            },
            bindEvents : function() {
                $(document)
                    .on('click', '.route', this.getRoute)
                    .on('click', '.view-more-details', this.goToRouteDetails);
            },
            searchRoute : function(keyword) {
                // perform ajax call
                $.ajax({
                    type : 'get',
                    url : '/api/v0.2/routes/search?keyword=' + keyword,
                    dataType : 'json'
                }).done(function() {

                });
            },
            initializeGoogleMap : function(navigator) {
                var self = ScribbleSearch,
                    position = new google.maps.LatLng(navigator.coords.latitude, navigator.coords.longitude);

                // set the map
                self.map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom : 16,
                    mapTypeId : google.maps.MapTypeId.ROADMAP,
                    center : position
                });

                self.getFirstActiveRoute();
            },
            getFirstActiveRoute : function() {
                var self = ScribbleSearch;

                // get the active route
                var routeId = $('.route-lists').find('.route.active').attr('data-route-id');

                // get the coordinates
                self.getCoordinates(routeId);
            },
            getRoute : function(e) {
                e.preventDefault();
                var self    = ScribbleSearch,
                    routeId = $(this).attr('data-route-id');

                // set active route to inactive
                $('.route-lists').find('.route.active').removeClass('active');

                // set current to active
                $(this).addClass('active');

                self.getCoordinates(routeId);
            },
            getCoordinates : function(routeId) {
                var self = ScribbleSearch;

                $.ajax({
                    type : 'get',
                    url : '/api/v0.2/coordinates/get?route_id=' + routeId,
                    dataType : 'json'
                }).done(function(response) {
                    if (response.data) {
                        // plot the route in the map
                        self.plotRouteInTheMap(response.data.coordinates);
                    }
                })
            },
            goToRouteDetails : function(e) {
                e.preventDefault();
                var $this = $(this),
                    routeId = $this.parent('.route').attr('data-route-id');

                // redirect
                window.location.href = '/routes/detail/' + routeId;
            },
            plotRouteInTheMap : function(coordinates) {
                // set the needed variables
                var self = ScribbleSearch,
                    latitudeLongitude = [],
                    latitudeLongitudeBounds = new google.maps.LatLngBounds(),
                    map = new google.maps.Map(document.getElementById('map_canvas'), {
                        zoom : 16,
                        mapTypeId : google.maps.MapTypeId.ROADMAP
                    });

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
            }
        };

        ScribbleSearch.init();
    </script>
@stop
