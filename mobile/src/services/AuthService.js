CommuttrApp.factory('AuthService', ['$http', function($http) {
    return {
        validate : function(email, password) {
            return $http.post('http://localhost:8000/api/v0.2/auth/login?request=api',
                'email=' + email + '&password=' + password);
        }
    }
}]);
