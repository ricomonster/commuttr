(function() {
    'use strict';

    angular.module('commutrMobile.components.routes')
        .controller('RoutesSearchController', [
            '$state', '$stateParams', 'RoutesComponentService', 'ionicMaterialInk',
            RoutesSearchController]);

    function RoutesSearchController($state, $stateParams, RoutesComponentService,
        ionicMaterialInk) {
        var self = this,
            keyword = $stateParams.keyword;

        self.results = [];

        // perform an API search
        RoutesComponentService.search(keyword)
            .success(function(response) {
                if (response.results) {
                    self.results = response.results;
                }
            });

        // run ink effect
        ionicMaterialInk.displayEffect();
    }
})();
