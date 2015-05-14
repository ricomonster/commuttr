CommuttrApp.controller('RouteSearchController', ['$ionicLoading', '$scope', '$stateParams', '$timeout', 'RouteService', function($ionicLoading, $scope, $stateParams, $timeout, RouteService) {
    $scope.searchResults = {};

    // show loader
    $ionicLoading.show();

    // initialize search once page loads
    var initialize = function() {
        // set the parameters for the search
        var parameters = {
            keyword : $stateParams.keyword
        };

        RouteService.search(parameters).success(function(response) {
            if (response.data) {
                $scope.searchResults = response.data.results;

                // hide loader
                $ionicLoading.hide();
            }
        });
    };

    initialize();

    ionic.material.ink.displayEffect();
}]);
