(function() {
    'use strict';

    angular.module('commuttrApp', [
        'ngMaterial',
        'commuttrApp.authComponents',
        'commuttrApp.headerComponents',
        'commuttrApp.landingComponents',
        'commuttrApp.routesComponents',
        'commuttrApp.toastServices',
        'commuttrApp.config',
        'commuttrApp.routes',
        'commuttrApp.run']);

    angular.module('commuttrApp.routes', ['ui.router', 'ngMaterial']);
    angular.module('commuttrApp.config', ['ngMaterial']);
    angular.module('commuttrApp.run', []);

    // Components
    angular.module('commuttrApp.authComponents', [
        'ui.router', 'ngMaterial', 'commuttrApp.toastServices']);
    angular.module('commuttrApp.headerComponents', ['ui.router', 'ngMaterial']);
    angular.module('commuttrApp.routesComponents', ['ui.router', 'ngMaterial']);
    angular.module('commuttrApp.landingComponents', ['ui.router', 'ngMaterial']);

    // Services
    angular.module('commuttrApp.toastServices', ['ngMaterial']);
})();
