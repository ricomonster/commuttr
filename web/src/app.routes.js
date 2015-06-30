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

            .state('account', {
                url : '/account',
                templateUrl : 'app/components/account/account.html'
            })
            .state('account.details', {
                url : '/details',
                templateUrl : 'app/components/account-details/account-details.html'
            })
            .state('account.password', {
                url : '/password',
                templateUrl : 'app/components/account-password/account-password.html'
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
            .state('routes.create', {
                url : '/create',
                views : {
                    'routes_content' : {
                        templateUrl : 'app/components/routes/create.html'
                    }
                }
            })
    }
})();
