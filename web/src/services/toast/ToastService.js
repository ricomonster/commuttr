(function() {
    'use strict';

    angular.module('commuttrApp.toastServices')
        .factory('ToastService', ['$mdToast', ToastService]);

    function ToastService($mdToast) {
        return {
            show : function(message) {
                // hide toast
                this.hide();

                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('bottom left')
                        .hideDelay(0));
            },
            hide : function() {
                $mdToast.hide();
            }
        }
    }
})();
