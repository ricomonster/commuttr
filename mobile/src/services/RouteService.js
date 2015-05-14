CommuttrApp.factory('RouteService', ['$http', function($http) {
    return {
        search : function(query) {
            return $http.get('http://localhost:8000/api/v0.2/routes/search?keyword=' + query.keyword);
        }
    }
}]);
