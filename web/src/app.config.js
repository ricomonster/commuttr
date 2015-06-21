(function() {
    angular.module('commuttrApp.config')
        .config(['$httpProvider', config])
        .config(['$mdThemingProvider', themeConfiguration]);

    function config($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    function themeConfiguration($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('red');
    }
})();
