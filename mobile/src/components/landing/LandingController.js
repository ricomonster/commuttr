(function() {
    'use strict';

    angular.module('commutrMobile.components.landing')
        .controller('LandingController', [
            '$state', '$ionicViewSwitcher', 'ionicMaterialInk', LandingController]);

    function LandingController($state, $ionicViewSwitcher, ionicMaterialInk) {
        var self = this;

        self.search = [];

        /**
         * Perform route search
         */
        self.doSearch = function() {
            // set animation
            $ionicViewSwitcher.nextDirection('forward');

            // redirect to the routes search state
            $state.go('routes.search', {
                keyword : (self.search.keyword || '')
            });
        };

        // run ink effect
        ionicMaterialInk.displayEffect();
    }
})();
