(function() {
    'use strict';

    angular.module('commuttrApp.components.auth')
        .controller('AuthRegisterController', [
            '$state', 'AuthComponentService', 'ToastService',
            AuthRegisterController]);

    function AuthRegisterController($state, AuthComponentService, ToastService) {
        this.register = {};
        this.errors = {};
        this.showErrors = false;

        // set the content of the select
        this.userTypes = [
            { value : 1, type : 'Commuter' },
            { value : 2, type : 'Driver'}];

        // submit for the registration
        this.submitRegistration = function() {
            var self = this,
                register = self.register;

            ToastService.show('Saving...');

            // hide errors
            self.showErrors = false;

            // do an API call to validate/register the data given
            AuthComponentService
                .register(register.email, register.password, register.name, register.type)
                .success(function(response) {
                    if (response.result) {
                        ToastService.show('You have successfully registered. You can now logged in.');
                    }
                })
                .error(function(response) {
                    ToastService.hide();

                    // show the error messages
                    self.errors = response.errors.message;
                    self.showErrors = true;
                })
        };
    }
})();
