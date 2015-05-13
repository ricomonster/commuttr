window.CommuttrApp = angular.module('CommuttrApp', ['ionic'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url : '/',
            templateUrl : 'application/templates/home.html'
        })

        .state('login', {
            url : '/login',
            templateUrl : 'application/templates/auth/login.html',
            controller : 'LoginController.'
        });

    // page does not exists
    // redirect to main page
    $urlRouterProvider.otherwise('/');
}])
