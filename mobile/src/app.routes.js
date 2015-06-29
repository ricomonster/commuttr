(function() {
    'use strict';

    angular.module('commutrMobile.routes')
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

            .state('routes', {
                url : '/routes',
                templateUrl : 'app/components/routes/routes.html',
                abstract : true
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
                url : '/details/:id',
                views : {
                    'routes_content' : {
                        templateUrl : 'app/components/routes/details.html'
                    }
                }
            });
    }
})();
