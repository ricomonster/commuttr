!function(){"use strict";function o(o,n){var e=this;e.search=[],e.doSearch=function(){o.go("routes.search",{keyword:e.search.keyword||""})},n.displayEffect()}angular.module("commutrMobile.components.landing").controller("LandingController",["$state","ionicMaterialInk",o])}();