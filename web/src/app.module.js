(function() {
    'use strict';

    angular.module('commuttrApp', [
        'commuttrApp.authComponents',
        'commuttrApp.accountComponents',
        'commuttrApp.accountDetailsComponents',
        'commuttrApp.headerComponents',
        'commuttrApp.landingComponents',
        'commuttrApp.routesComponents',
        'commuttrApp.sidebarComponents',
        'commuttrApp.authServices',
        'commuttrApp.storageServices',
        'commuttrApp.toastServices',
        'commuttrApp.config',
        'commuttrApp.routes',
        'commuttrApp.run',
        'commuttrApp.constants']);

    angular.module('commuttrApp.routes', ['ui.router', 'ngMaterial']);
    angular.module('commuttrApp.config', ['ngMaterial', 'LocalStorageModule']);
    angular.module('commuttrApp.run', ['commuttrApp.storageServices']);
    angular.module('commuttrApp.constants', []);

    // Components
    angular.module('commuttrApp.accountComponents', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    angular.module('commuttrApp.accountDetailsComponents', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    angular.module('commuttrApp.authComponents', [
        'ui.router', 'ngMaterial', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    angular.module('commuttrApp.headerComponents', [
        'ui.router', 'ngMaterial', 'commuttrApp.authServices', 'commuttrApp.constants']);

    angular.module('commuttrApp.landingComponents', ['ui.router', 'ngMaterial']);
    angular.module('commuttrApp.routesComponents', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    angular.module('commuttrApp.sidebarComponents', ['ui.router', 'ngMaterial']);

    // Services
    angular.module('commuttrApp.authServices', ['commuttrApp.storageServices',
        'commuttrApp.constants']);
    angular.module('commuttrApp.toastServices', ['ngMaterial']);
    angular.module('commuttrApp.storageServices', ['LocalStorageModule']);
})();
