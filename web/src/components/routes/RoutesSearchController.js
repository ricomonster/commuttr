(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .controller('RoutesSearchController', [
            '$state', '$stateParams', 'RoutesComponentService', RoutesSearchController]);

    function RoutesSearchController($state, $stateParams, RoutesComponentService) {
        var self = this;

        self.searchResults = {};
        self.showResults = false;

        // do search using keyword to the API
        RoutesComponentService.search($stateParams.keyword)
            .success(function(response) {
                if (response.results) {
                    self.searchResults = response.results;
                    self.showResults = true;
                }
            })
            .error(function(response) {

            })
    }
})();
