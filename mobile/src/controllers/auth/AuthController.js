CommuttrApp.controller('AuthController', ['$ionicModal', '$scope', '$state', 'AuthService', 'UserService', 'HelperService', function($ionicModal, $scope, $state, AuthService, UserService, HelperService) {
    $scope.account = {};
    $scope.login = {};

    /**
     * Click events
     */
    // show the modal for account creation
    $scope.showCreateAccountModal = function() {
        $scope.createAccountModal.show();
        ionic.material.ink.displayEffect();
    };

    // shows the sign in modal
    $scope.showSignInModal = function() {
        $scope.loginModal.show();
        ionic.material.ink.displayEffect();
    };

    /**
     * Set up modals
     */
    // account modal
    var initializeCreateAccountModal = function() {
        $ionicModal.fromTemplateUrl('application/templates/auth/modal_create_account.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.createAccountModal = modal;
        });
    };

    // login modal
    var initializeLoginModal = function() {
        $ionicModal.fromTemplateUrl('application/templates/auth/modal_login.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.loginModal = modal;
        });
    };

    /**
     * Create account modal functions
     */
    // closes the account modal
    $scope.closeCreateAccountModal = function() {
        $scope.createAccountModal.hide();
    };

    // submit account modal form submission
    $scope.submitCreateAccount = function() {
        var user = $scope.account;

        // validate form contents
        if (!user.email || !('' + user.email).length) {
            HelperService.popup('We need your email.', 'Error!');
            return;
        }

        if (!user.password || !('' + user.password).length) {
            HelperService.popup('We need your password.', 'Error!');
            return;
        }

        if (!user.name || !('' + user.name).length) {
            HelperService.popup('We need your name.', 'Error!');
            return;
        }

        // show loader
        HelperService.loader(true);

        UserService.create(user.email, user.password, user.name).success(function(response) {
            if (response.data) {
                // save user details to the local storage

                // close modal
                HelperService.loader();

                // redirect to account details
            }
        }).error(function(response) {
            var errors = response.errors.message;

            // hide loader
            HelperService.loader();

            // loop to show the errors
            for (var e in errors) {
                for (var m in errors[e]) {
                    HelperService.popup(errors[e][m], 'Error');
                }
            }
        });
    };

    /**
     * Login functions
     */
    $scope.closeSignInModal = function() {
        $scope.loginModal.hide();
    };

    $scope.submitSignIn = function() {
        var login = $scope.login;

        // simple field validation
        // email is needed
        if (!login.email || !('' + login.email).length) {
            HelperService.popup('We need your email to login.', 'Error');
            return;
        }

        // password is needed
        if (!login.password || !('' + login.password).length) {
            HelperService.popup('We need your password to login.', 'Error');
            return;
        }

        // show loader
        HelperService.loader(true);

        // send request to validate login credentials
        AuthService.validate(login.email, login.password).success(function(response) {
            if (response.results) {
                // save returned data to the local storage
                // redirect to user details page
                // hide loader
            }
        }).error(function(error) {
            // hide loader
            HelperService.loader();

            // show error
            HelperService.popup(error.errors.message, 'Error');
        })
    };

    // run this bitches
    initializeCreateAccountModal();
    initializeLoginModal();

    ionic.material.ink.displayEffect();
}]);
