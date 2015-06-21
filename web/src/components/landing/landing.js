(function() {
    'use strict';

    angular.module('commuttrApp.landingComponents', ['ui.router'])
        .controller('LandingController', ['$state', LandingController]);

    function LandingController($state) {
        this.search = {};

        this.searchRoute = function() {
            var keyword = this.search.keyword;
            // go to search page
            $state.go('routes.search', {
                'keyword' : keyword
            });
        };
    }
})();
