CommuttrApp.factory('RouteService', ['$http', function($http) {
    return {
        getRoute : function(id) {
            return $http.get('http://localhost:8000/api/v0.2/routes/get_route?route_id=' + id);
        },
        search : function(query) {
            return $http.get('http://localhost:8000/api/v0.2/routes/search?keyword=' + query.keyword);
        }
    }
}]);
