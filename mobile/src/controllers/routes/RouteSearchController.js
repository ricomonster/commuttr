CommuttrApp.controller('RouteSearchController', ['$scope', '$stateParams', '$timeout', 'HelperService' , 'RouteService', function($scope, $stateParams, $timeout, HelperService, RouteService) {
    $scope.searchResults = {};

    // show loader
    HelperService.loader(true);

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
                HelperService.loader();
            }
        });
    };

    initialize();

    // ink effect fix
    $scope.$on('ngLastRepeat.list', function(e) {
        ionic.material.ink.displayEffect();
    });
}]);
