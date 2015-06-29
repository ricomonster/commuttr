(function() {
    'use strict';

    angular.module('commutrMobile', [
        'commutrMobile.constants',
        'commutrMobile.config',
        'commutrMobile.routes',
        'commutrMobile.run',
        'commutrMobile.components.landing',
        'commutrMobile.components.routes',
        'commutrMobile.directives.applyInk',
        'commutrMobile.services.storage'
    ]);

    // app dependencies
    angular.module('commutrMobile.constants', []);
    angular.module('commutrMobile.config', ['LocalStorageModule']);
    angular.module('commutrMobile.routes', ['ui.router']);
    angular.module('commutrMobile.run', ['ionic', 'commutrMobile.services.storage']);

    // components
    angular.module('commutrMobile.components.landing', ['ionic', 'ionic-material']);
    angular.module('commutrMobile.components.routes', [
        'ionic', 'ionic-material', 'commutrMobile.directives.applyInk',
        'commutrMobile.services.storage']);

    // directives
    angular.module('commutrMobile.directives.applyInk', []);

    // services
    angular.module('commutrMobile.services.storage', ['LocalStorageModule']);
})();
