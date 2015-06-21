(function() {
    angular.module('commuttrApp.authComponents')
        .factory('AuthComponentService', ['$http', AuthComponentService]);

    function AuthComponentService($http) {
        return {
            register : function(email, password, name, type) {
                return $http.post('http://localhost:8000/api/v2.0/users/create',
                    'email=' + (email || ' ') + '&password=' + (password || ' ') +
                    '&name=' + (name || ' ') + '&type=' + (type || ' '));
            }
        }
    }
})();
