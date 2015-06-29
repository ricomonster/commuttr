(function() {
    'use strict';

    angular.module('commuttrApp.authComponents')
        .controller('AuthLoginController', [
            '$rootScope', '$state', 'AuthComponentService', 'StorageService', 'ToastService',
            AuthLoginController]);

    function AuthLoginController($rootScope, $state, AuthComponentService, StorageService, ToastService) {
        var self = this;
        self.login = {};
        self.showErrors = false;

        // validate and logs in the user
        self.submitLogin = function() {
            // show toast
            ToastService.show('Validating...');

            // hide errors
            self.showErrors = false;

            // do an API call
            AuthComponentService
                .login(self.login.email, self.login.password)
                .success(function(response) {
                    if (response.user) {
                        // save user details
                        StorageService.set('user', response.user);

                        // broadcast that there is a successful login event
                        $rootScope.$broadcast('logged-in');

                        // show some success message
                        ToastService.show('You have successfully logged in.', 5000);

                        // redirect
                        $state.go('landing');
                    }
                })
                .error(function(errors) {
                    ToastService.hide();

                    // show errors// show the error messages
                    self.errors = errors.errors.message;
                    self.showErrors = true;
                })
        }
    }
})();
