(function() {
    'use strict';

    angular.module('commuttrApp.components.sidebar')
        .controller('SidebarController', ['$mdSidenav', '$rootScope', 'AuthService',
            SidebarController]);

    function SidebarController($mdSidenav, $rootScope, AuthService) {
        var self = this;

        // assign user details
        self.user = AuthService.user();

        // logs out the user
        self.logout = function() {
            // log out the user
            AuthService.logout();

            // toggle sidebar
            $mdSidenav('right').toggle();

            // broadcast log out event is triggered
            $rootScope.$broadcast('logged-out');
        };

        self.closeSidebar = function() {
            // toggle sidebar
            $mdSidenav('right').toggle();
        };

        // listen for sidebar to be toggled
        $rootScope.$on('show-sidebar', function() {
            $mdSidenav('right').toggle();
        });

        // listen for logged in event
        $rootScope.$on('logged-in', function() {
            self.user = AuthService.user();
        });
    }
})();
