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
                views : {
                    'account_contents' : {
                        templateUrl : 'app/components/account-details/account-details.html'
                    }
                }
            })
            .state('account.password', {
                url : '/password',
                views : {
                    'account_contents' : {
                        templateUrl : 'app/components/account-password/account-password.html'
                    }
                }
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

            .state('vehicle', {
                url : '/vehicle'
            })
            .state('vehicle.create', {
                url : '/create'
            })
            .state('vehicle.addRoute', {
                url : '/add-route'
            })

            .state('routes', {
                url : '/routes',
                templateUrl : 'app/components/routes/routes.html'
            })
            .state('routes.search', {
                url : '/search?keyword',
                views : {
                    'routes_content' : {
                        templateUrl : 'app/components/route-search/search.html'
                    }
                }
            })
            .state('routes.create', {
                url : '/create',
                views : {
                    'routes_content' : {
                        templateUrl : 'app/components/route-create/create.html'
                    }
                }
            })
    }
})();
