!function(){function r(r,o){return{register:function(e,t,s,n){return r.post(o.API_URL+"users/create","email="+(e||" ")+"&password="+(t||" ")+"&name="+(s||" ")+"&type="+(n||" "))},login:function(e,t){return r.post(o.API_URL+"auth/login","email="+(e||" ")+"&password="+(t||""))}}}angular.module("commuttrApp.authComponents").factory("AuthComponentService",["$http","CONFIG",r])}(),function(){"use strict";function r(r){}angular.module("commuttrApp.authComponents").controller("AuthController",["$state",r])}(),function(){"use strict";function r(r,o,e,t,s){var n=this;n.login={},n.showErrors=!1,n.submitLogin=function(){s.show("Validating..."),n.showErrors=!1,e.login(n.login.email,n.login.password).success(function(e){e.user&&(t.set("user",e.user),r.$broadcast("logged-in"),s.show("You have successfully logged in.",5e3),o.go("landing"))}).error(function(r){s.hide(),n.errors=r.errors.message,n.showErrors=!0})}}angular.module("commuttrApp.authComponents").controller("AuthLoginController",["$rootScope","$state","AuthComponentService","StorageService","ToastService",r])}(),function(){"use strict";function r(r,o,e){this.register={},this.errors={},this.showErrors=!1,this.userTypes=[{value:1,type:"Commuter"},{value:2,type:"Driver"}],this.submitRegistration=function(){var r=this,t=r.register;e.show("Saving..."),r.showErrors=!1,o.register(t.email,t.password,t.name,t.type).success(function(r){r.result&&e.show("You have successfully registered. You can now logged in.")}).error(function(o){e.hide(),r.errors=o.errors.message,r.showErrors=!0})}}angular.module("commuttrApp.authComponents").controller("AuthRegisterController",["$state","AuthComponentService","ToastService",r])}();