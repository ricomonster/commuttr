(function() {
    'use strict';

    angular.module('commuttrApp.routesComponents')
        .factory('RoutesComponentService', ['$http', RoutesComponentService]);

    function RoutesComponentService($http) {
        return {
            search : function(keyword) {
                return $http.get('http://localhost:8000/api/v2.0/routes/search?keyword=' +
                    (keyword || ' '));
            }
        }
    }
})();
