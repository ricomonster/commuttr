CommuttrApp.controller('FooterController', ['$scope', '$state', function($scope, $state) {
    // checks if the user is logged in or not
    // if the user is logged in, it will redirect to the account settings page
    // if the user is not logged in, it will redirect to the login/register page
    $scope.checkUserLoggedIn = function() {
        // redirect to user details if the user is logged
        $state.go('auth');
    };
}]);
