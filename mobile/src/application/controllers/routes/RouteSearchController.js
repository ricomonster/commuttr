CommuttrApp.controller('RouteSearchController', ['$ionicLoading', '$scope', '$stateParams', 'RouteService', function($ionicLoading, $scope, $stateParams, RouteService) {
    $scope.results = {};
    $scope.search = {};

    // show loader
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var searchRoute = function(keyword) {
        $scope.keyword = keyword;

        // do an API request via service
        RouteService.search($scope.keyword).success(function(response) {
            if (response.data) {
                $scope.results = response.data.results;

                $ionicLoading.hide();
            }
        }).error(function() {

        });
    };

    // search function
    $scope.doSearch = function() {
        // show loader
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        searchRoute($scope.search.keyword);
    };

    searchRoute($stateParams.keyword);
}]);
