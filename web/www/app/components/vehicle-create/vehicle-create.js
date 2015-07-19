!function(){"use strict";function e(e,r,t,o,n){var c=this;c.errors=[],c.transportationList=[],c.user=t.user(),c.vehicle=[],n.transportation().success(function(e){e.vehicles&&(c.transportationList=e.vehicles)}),c.closeDialog=function(r){r.preventDefault(),e.cancel()},c.createVehicle=function(){var t=c.vehicle;c.errors=[],o.show("Saving..."),n.create(c.user.id,t.vehicle_name,t.plate_number,t.transportation,t.details).success(function(t){t.vehicle&&(e.cancel(),c.vehicle=[],o.show("You have successfully added a vehicle.",5e3),r.$broadcast("new-vehicle-added"))}).error(function(e){o.show("Something went wrong.",5e3),e.errors.message&&o.show(e.error.message,5e3),c.errors=e.errors})}}angular.module("commuttrApp.components.vehicleCreate").controller("VehicleCreateController",["$mdDialog","$rootScope","AuthService","ToastService","VehicleCreateService",e])}(),function(){"use strict";function e(e,r){return{create:function(t,o,n,c,i){return e.post(r.API_URL+"vehicles/create?user_id="+t,"vehicle_name="+(o||"")+"&plate_number="+(n||"")+"&transportation_id="+(c||"")+"&details="+(i||""))},transportation:function(){return e.get(r.API_URL+"transportation/vehicle_lists")}}}angular.module("commuttrApp.components.vehicleCreate").factory("VehicleCreateService",["$http","CONFIG",e])}();