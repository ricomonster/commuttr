CommuttrApp.factory('Helper', ['$ionicLoading', '$ionicPopup', function($ionicLoading, $ionicPopup) {
    return {
        loader : function(show) {
            if (show) {
                $ionicLoading.show({
                    template: '<div class="loader"><svg class="circular">' +
                    '<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"' +
                    ' stroke-miterlimit="10"/></svg></div>'});

                return;
            }

            $ionicLoading.hide();
            return;
        },
        popup : function(message, type) {
            var alertPopup = $ionicPopup.alert({
                title: type,
                template: message
            });

            alertPopup.then(function(res) {
                return;
            });
        }
    }
}]);
