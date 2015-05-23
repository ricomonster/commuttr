CommuttrApp.controller('RouteDetailController', ['$scope', '$stateParams', 'HelperService', 'RouteService', function($scope, $stateParams, HelperService, RouteService) {
    $scope.route = {};

    // show loader
    //HelperService.loader(true);

    // this will run once the page/controller loads
    var initialize = function() {
        // get the id
        var id = $stateParams.id;

        // get the route
        RouteService.getRoute(id).success(function(response) {
            if (response.data) {
                // assign to the scope
                $scope.route = response.data.route;

                // initialize the map
                initializeMap();
            }
        })
    };

    var initializeMap = function() {
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(-34.397, 150.644)
        };

        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions),
            latitudeLongitude = [],
            latitudeLongitudeBounds = new google.maps.LatLngBounds();
    };

    initialize();

    ionic.material.ink.displayEffect();
}]);
