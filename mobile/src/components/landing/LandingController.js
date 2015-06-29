(function() {
    'use strict';

    angular.module('commutrMobile.components.landing')
        .controller('LandingController', ['$state', 'ionicMaterialInk', LandingController]);

    function LandingController($state, ionicMaterialInk) {
        var self = this;

        self.search = [];

        /**
         * Perform route search
         */
        self.doSearch = function() {
            // redirect to the routes search state
            $state.go('routes.search', {
                keyword : (self.search.keyword || '')
            });
        };

        // run ink effect
        ionicMaterialInk.displayEffect();
    }
})();
