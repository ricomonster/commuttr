CommuttrApp.factory('UserService', ['$http', function($http) {
    return {
        create : function(email, password, name) {
            return $http.post('http://localhost:8000/api/v0.2/users/create',
                'email=' + email + '&password=' + password + '&name=' + name);
        }
    }
}]);
