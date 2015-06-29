(function() {
    'use strict';

    angular.module('commutrMobile.components.routes')
        .factory('RoutesComponentService', ['$http', RoutesComponentService]);

    function RoutesComponentService($http) {
        return {
            search : function(keyword) {
                return $http.get('http://localhost:8000/api/v2.0/routes/search?keyword=' +
                    (keyword || ''));
            },
            getRoute : function(id) {
                return $http.get('http://localhost:8000/api/v2.0/routes/get_route?route_id=' + id);
            }
        }
    }
})();
