(function() {
    'use strict';

    angular.module('commutrMobile.config')
        .config(['$httpProvider', HttpProvider])
        .config(['localStorageServiceProvider', localStorageConfiguration]);

    function HttpProvider($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }

    function localStorageConfiguration(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('commutrMobile');
    }
})();
