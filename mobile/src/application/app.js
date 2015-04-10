// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.CommuttrApp = angular.module('CommuttrApp', ['ionic'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('splash', {
            url : '/splash',
            templateUrl: 'templates/defaults/index.html',
            controller : 'SplashPageController'
        })

        .state('commuttr', {
            url : '/commuttr',
            templateUrl : 'templates/commuttr/menu.html',
            abstract : true
        })

        .state('route', {
            url : '/route',
            templateUrl : 'templates/routes/menu.html',
            abstract : true
        })

        .state('route.search', {
            url : '/search/:keyword',
            views: {
                'route_menu_content': {
                    templateUrl: 'templates/routes/search.html',
                    controller: 'RouteSearchController'
                }
            }
        })

        .state('route.view', {
            cache: false,
            url : '/view/:routeId',
            views : {
                'route_menu_content' : {
                    templateUrl : 'templates/routes/view.html',
                    controller : 'RouteViewController'
                }
            }
        });

    $urlRouterProvider.otherwise('/splash');
}])

.run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}]);
