(function() {
    'use strict';

    angular.module('commuttrApp.accountDetailsComponents')
        .controller('AccountDetailsController', [
            'AuthService', 'StorageService', 'ToastService', 'AccountDetailsService',
            AccountDetailsController]);

    function AccountDetailsController(AuthService, StorageService, ToastService, AccountDetailsService) {
        var self = this;

        self.formErrors = [];
        self.account = AuthService.user();

        self.submitAccountDetails = function() {
            var account = self.account;

            ToastService.show('Saving...');

            AccountDetailsService
                .updateDetails(account.id, account.name, account.email)
                .success(function(response) {
                    if (response.user) {
                        // update contents in the storage
                        // broadcast event to reflect changes
                        // show a success message
                        ToastService.show('You have successfully updated your details.', 5000);
                    }
                }).error(function(response) {
                    // show errors
                    ToastService.show('There are some errors encountered.', 5000);

                    self.formErrors = response.errors.message;
                })
        };
    }
})();
