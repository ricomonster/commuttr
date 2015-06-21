(function() {
    'use strict';

    angular.module('commuttrApp.routes')
        .config(['$stateProvider', '$urlRouterProvider', routes]);

    function routes($stateProvider, $urlRouterProvider) {
        // default view once page does not exists
        $urlRouterProvider.otherwise('/');

        // state routes
        $stateProvider
            .state('landing', {
                url : '/',
                templateUrl : 'app/components/landing/landing.html'
            })

            .state('auth', {
                url : '/auth',
                templateUrl : '/app/components/auth/auth.html'
            })
            .state('auth.login', {
                url : '/login',
                templateUrl : 'app/components/auth/login.html'
            })
            .state('auth.register', {
                url : '/register',
                templateUrl : 'app/components/auth/register.html'
            })

            .state('routes', {
                url : '/routes',
                templateUrl : 'app/components/routes/routes.html'
            })
            .state('routes.search', {
                url : '/search?keyword',
                views : {
                    'routes_content' : {
                        templateUrl : 'app/components/routes/search.html'
                    }
                }
            })
            .state('routes.details', {
                url : '/navigate/:id',
            })
            .state('routes.create', {
                url : '/create',
            })
    }
})();
