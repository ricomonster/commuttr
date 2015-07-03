(function() {
    'use strict';

    angular.module('commuttrApp.accountDetailsComponents')
        .factory('AccountDetailsService', ['$http', 'CONFIG', AccountDetailsService]);

    function AccountDetailsService($http, CONFIG) {
        return {
            updateDetails : function(id, name, email) {
                return $http.post(CONFIG.API_URL + 'users/update_details?user_id=' + id,
                    'name=' + name + '&email=' + email);
            }
        }
    }
})();
