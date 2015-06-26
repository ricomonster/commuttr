(function() {
    'use strict';

    angular.module('commuttrApp.sidebarComponents')
        .controller('SidebarController', ['$mdSidenav', '$rootScope', 'AuthService',
            SidebarController]);

    function SidebarController($mdSidenav, $rootScope, AuthService) {
        var self = this;

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
    }
})();
