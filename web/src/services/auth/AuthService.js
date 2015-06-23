(function() {
    'use strict';

    angular.module('commuttrApp.authServices')
        .factory('AuthService', ['StorageService', AuthService]);

    function AuthService(StorageService) {
        return {
            user : function() {
                return StorageService.get('user');
            },
            logout : function() {
                StorageService.remove('user');
            }
        }
    }
})();
