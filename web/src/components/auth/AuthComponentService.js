(function() {
    angular.module('commuttrApp.authComponents')
        .factory('AuthComponentService', ['$http', 'CONFIG', AuthComponentService]);

    function AuthComponentService($http, CONFIG) {
        return {
            register : function(email, password, name, type) {
                return $http.post(CONFIG.API_URL + 'users/create',
                    'email=' + (email || ' ') + '&password=' + (password || ' ') +
                    '&name=' + (name || ' ') + '&type=' + (type || ' '));
            },
            login : function(email, password) {
                return $http.post(CONFIG.API_URL + 'auth/login',
                    'email=' + (email || ' ') + '&password=' + (password || ''));
            }
        }
    }
})();
