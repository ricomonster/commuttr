(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .controller('RoutesSearchController', [
            '$state', '$stateParams', '$window', 'RoutesComponentService', RoutesSearchController]);

    function RoutesSearchController($state, $stateParams, $window, RoutesComponentService) {
        var self = this;

        self.map = '';
        self.searchResults = {};
        self.showResults = false;
        self.keyword = $stateParams.keyword;

        // do search using keyword to the API
        RoutesComponentService.search($stateParams.keyword)
            .success(function(response) {
                if (response.results) {
                    self.searchResults = response.results;
                    self.showResults = true;
                }
            })
            .error(function(response) {

            });

        self.goToRouteDetails = function(route) {
            $state.go('routes.details', {
                id : route.id
            });
        }
    }
})();
