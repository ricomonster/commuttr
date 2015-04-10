CommuttrApp.controller('SplashPageController', ['$ionicViewSwitcher', '$location', '$scope', '$state', function($ionicViewSwitcher, $location, $scope, $state) {
    $scope.search = {};

    $scope.doSearch = function() {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('route.search', { keyword : $scope.search.query });
        return;
    };
}]);
