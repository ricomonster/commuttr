(function() {
    'use strict';

    angular.module('commuttrApp.components.header')
        .controller('HeaderController', ['$rootScope', 'AuthService', HeaderController]);

    function HeaderController($rootScope, AuthService) {
        var self = this;

        self.user = AuthService.user();
        self.loggedIn = (self.user);

        // opens the sidebar
        self.showSidebar = function() {
            $rootScope.$broadcast('show-sidebar');
        };

        // listen for a successful login
        $rootScope.$on('logged-in', function() {
            self.user = AuthService.user();
            self.loggedIn = (self.user);
        });

        // listen for a logout event
        $rootScope.$on('logged-out', function() {
            self.user = AuthService.user();
            self.loggedIn = (self.user);
        });
    }
})();
