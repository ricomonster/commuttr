CommuttrApp.factory('RouteService', ['$http', function($http) {
    return {
        search : function(query) {
            return $http.get('http://localhost:8000/api/v1.0/routes/search?query=' + query);
        },
        get : function(id) {
            return $http.get('http://localhost:8000/api/v1.0/routes/get_route?route_id=' + id);
        }
    };
}]);
