!function(){"use strict";function e(e,t,r,o){var c=this;c.formErrors=[],c.account=e.user(),c.submitAccountDetails=function(){var e=c.account;r.show("Saving..."),o.updateDetails(e.id,e.name,e.email).success(function(e){e.user&&r.show("You have successfully updated your details.",5e3)}).error(function(e){r.show("There are some errors encountered.",5e3),c.formErrors=e.errors.message})}}angular.module("commuttrApp.components.accountDetails").controller("AccountDetailsController",["AuthService","StorageService","ToastService","AccountDetailsService",e])}(),function(){"use strict";function e(e,t){return{updateDetails:function(r,o,c){return e.post(t.API_URL+"users/update_details?user_id="+r,"name="+o+"&email="+c)}}}angular.module("commuttrApp.components.accountDetails").factory("AccountDetailsService",["$http","CONFIG",e])}();