window.CommuttrApp = angular.module('CommuttrApp', ['ionic'])

.run(['$ionicPlatform', function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}])


.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url : '/',
            templateUrl : 'application/templates/home.html',
            controller : 'HomeController'
        })

        //.state('auth', {
        //    url : '/auth'
        //});

        // route states
        .state('routes', {
            url : '/routes',
            templateUrl : 'application/templates/routes/menu.html',
            abstract : true
        })

        .state('routes.search', {
            url : '/search?keyword',
            views : {
                'route_menu_content' : {
                    controller : 'RouteSearchController',
                    templateUrl : 'application/templates/routes/search.html'
                }
            }
        })

    // page does not exists
    // redirect to main page
    $urlRouterProvider.otherwise('/');
}])
