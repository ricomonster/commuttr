(function() {
    'use strict';

    angular.module('commuttrApp.run')
        .run(['$http', run]);

    function run($http) {
        // change post header content type
        $http.defaults.headers.post = {
            'Accept' : '*/*',
            'Content-Type' : 'application/x-www-form-urlencoded'
        };
    }
})();
