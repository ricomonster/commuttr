CommuttrApp.factory('StorageService', ['localStorageService', function(localStorageService) {
    return {
        set : function(key, value) {
            return localStorageService.set(key, value);
        },
        get : function(key) {
            return localStorageService.get(key);
        },
        update : function(key, value) {

        },
        delete : function(key) {
            localStorageService.remove(key);
        }
    }
}]);
