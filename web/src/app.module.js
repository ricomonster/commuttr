(function() {
    'use strict';

    angular.module('commuttrApp', [
        'commuttrApp.components.auth',
        'commuttrApp.components.account',
        'commuttrApp.components.accountDetails',
        'commuttrApp.components.header',
        'commuttrApp.components.landing',
        'commuttrApp.components.routeCreate',
        'commuttrApp.components.routeSearch',
        'commuttrApp.components.route',
        'commuttrApp.components.sidebar',
        'commuttrApp.components.vehicle',
        'commuttrApp.components.vehicleCreate',
        'commuttrApp.components.vehicleList',
        'commuttrApp.components.vehicleDetails',
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
    // account
    angular.module('commuttrApp.components.account', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    // account details
    angular.module('commuttrApp.components.accountDetails', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    // auth
    angular.module('commuttrApp.components.auth', [
        'ui.router', 'ngMaterial', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    // header
    angular.module('commuttrApp.components.header', [
        'ui.router', 'ngMaterial', 'commuttrApp.authServices', 'commuttrApp.constants']);

    // landing
    angular.module('commuttrApp.components.landing', ['ui.router', 'ngMaterial']);

    // routes
    angular.module('commuttrApp.components.route', ['ui.router', 'ngMaterial']);

    // routes create
    angular.module('commuttrApp.components.routeCreate', [
        'ui.router', 'ngMaterial', 'commuttrApp.authServices', 'commuttrApp.storageServices',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    // route search
    angular.module('commuttrApp.components.routeSearch', [
        'ui.router', 'ngMaterial', 'commuttrApp.authServices', 'commuttrApp.toastServices',
        'commuttrApp.constants']);

    angular.module('commuttrApp.components.sidebar', ['ui.router', 'ngMaterial']);

    // vehicle
    angular.module('commuttrApp.components.vehicle', ['ui.router', 'ngMaterial']);

    // vehicle create
    angular.module('commuttrApp.components.vehicleCreate', [
        'ngMaterial', 'commuttrApp.authServices', 'commuttrApp.toastServices',
        'commuttrApp.constants']);

    // vehicle list
    angular.module('commuttrApp.components.vehicleList', ['ui.router', 'ngMaterial',
        'commuttrApp.authServices', 'commuttrApp.toastServices', 'commuttrApp.constants']);

    // vehicle details
    angular.module('commuttrApp.components.vehicleDetails', ['ui.router', 'ngMaterial',
        'commuttrApp.toastServices', 'commuttrApp.constants']);

    // Services
    angular.module('commuttrApp.authServices', ['commuttrApp.storageServices',
        'commuttrApp.constants']);
    angular.module('commuttrApp.toastServices', ['ngMaterial']);
    angular.module('commuttrApp.storageServices', ['LocalStorageModule']);
})();
