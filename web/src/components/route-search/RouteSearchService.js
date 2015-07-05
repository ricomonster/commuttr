(function() {
    'use strict';

    angular.module('commuttrApp.components.routeSearch')
        .factory('RouteSearchService', ['$http', 'CONFIG', RouteSearchService]);

    function RouteSearchService($http, CONFIG) {
        return {
            search: function (keyword) {
                return $http.get(CONFIG.API_URL + 'routes/search?keyword=' + (keyword || ''));
            }
        }
    }
})();
