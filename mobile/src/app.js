window.CommuttrApp = angular.module('CommuttrApp', ['ionic', 'LocalStorageModule'])

.run(['$ionicPlatform', '$http', 'StorageService', function($ionicPlatform, $http, StorageService) {
    var saveLocation = function(coordinates) {
        StorageService.set('coordinates', JSON.stringify(coordinates.coords));
    };

    // change post header content type
    $http.defaults.headers.post = {
        'Accept' : '*/*',
        'Content-Type' : 'application/x-www-form-urlencoded'
    };

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

        // check if there's already a coordinates saved
        if (!StorageService.get('coordinates')) {
            // get user's coordinates
            if (navigator.geolocation) {
                // save the location
                navigator.geolocation.getCurrentPosition(saveLocation);
            }
        }
    });
}])

// fix the POST request
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
// local storage module config
.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('commuttr');
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url : '/',
            templateUrl : 'application/templates/home.html',
            controller : 'HomeController'
        })

        .state('auth', {
            url : '/auth',
            templateUrl : 'application/templates/auth/auth.html',
            controller : 'AuthController'
        })

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
        .state('routes.detail', {
            url : '/detail?id',
            views : {
                'route_menu_content' : {
                    controller : 'RouteDetailController',
                    templateUrl : 'application/templates/routes/detail.html'
                }
            }
        })

    // page does not exists
    // redirect to main page
    $urlRouterProvider.otherwise('/');
}])
