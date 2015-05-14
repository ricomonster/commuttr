CommuttrApp.controller('HomeController', ['$ionicViewSwitcher', '$scope', '$state', function($ionicViewSwitcher, $scope, $state) {
    $scope.search = {};

    // handle form submission
    $scope.searchRoute = function() {
        // hardcode the page transition
        $ionicViewSwitcher.nextDirection('forward');

        // redirect
        $state.go('routes.search', {
            keyword : $scope.search.query
        });
    };

    ionic.material.ink.displayEffect();
}]);
