!function(){"use strict";function t(t){return{show:function(o){this.hide(),t.show(t.simple().content(o).position("bottom left").hideDelay(0))},hide:function(){t.hide()}}}angular.module("commuttrApp.toastServices").factory("ToastService",["$mdToast",t])}();