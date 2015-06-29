(function() {
    'use strict';

    angular.module('commutrMobile.services.storage')
        .factory('StorageService', ['localStorageService', StorageService]);

    function StorageService(localStorageService) {
        return {
            set : function(key, value) {
                localStorageService.set(key, JSON.stringify(value));
            },
            get : function(key) {
                var data = localStorageService.get(key);
                return JSON.parse(data);
            },
            remove : function(key) {
                return localStorageService.remove(key);
            }
        }
    }
})();
