(function() {
    'use strict';

    angular.module('commutrMobile.components.routes')
        .controller('RoutesSearchController', [
            '$scope', '$state', '$stateParams', 'RoutesComponentService', 'ionicMaterialInk',
            RoutesSearchController]);

    function RoutesSearchController($scope, $state, $stateParams, RoutesComponentService,
                                    ionicMaterialInk) {
        var self = this;

        self.results = [];
        self.keyword = $stateParams.keyword;

        // perform an API search
        RoutesComponentService.search(self.keyword)
            .success(function(response) {
                if (response.results) {
                    self.results = response.results;
                }
            });


        $scope.$on('applyInk.results', function() {
            // run ink effect
            ionicMaterialInk.displayEffect();
        });
    }
})();
