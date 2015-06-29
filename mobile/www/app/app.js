!function(){"use strict";angular.module("commutrMobile",["commutrMobile.constants","commutrMobile.config","commutrMobile.routes","commutrMobile.run","commutrMobile.components.landing","commutrMobile.components.routes","commutrMobile.directives.applyInk","commutrMobile.services.storage"]),angular.module("commutrMobile.constants",[]),angular.module("commutrMobile.config",["LocalStorageModule"]),angular.module("commutrMobile.routes",["ui.router"]),angular.module("commutrMobile.run",["ionic","commutrMobile.services.storage"]),angular.module("commutrMobile.components.landing",["ionic","ionic-material"]),angular.module("commutrMobile.components.routes",["ionic","ionic-material","commutrMobile.directives.applyInk","commutrMobile.services.storage"]),angular.module("commutrMobile.directives.applyInk",[]),angular.module("commutrMobile.services.storage",["LocalStorageModule"])}(),function(){"use strict";function o(o){o.defaults.useXDomain=!0,delete o.defaults.headers.common["X-Requested-With"]}function e(o){o.setPrefix("commutrMobile")}angular.module("commutrMobile.config").config(["$httpProvider",o]).config(["localStorageServiceProvider",e])}(),function(){"use strict";function o(o,e){e.otherwise("/"),o.state("landing",{url:"/",templateUrl:"app/components/landing/landing.html"}).state("routes",{url:"/routes",templateUrl:"app/components/routes/routes.html","abstract":!0}).state("routes.search",{url:"/search?keyword",views:{routes_content:{templateUrl:"app/components/routes/search.html"}}}).state("routes.details",{url:"/details/:id",views:{routes_content:{templateUrl:"app/components/routes/details.html"}}})}angular.module("commutrMobile.routes").config(["$stateProvider","$urlRouterProvider",o])}(),function(){"use strict";function o(o,e){e.defaults.headers.post={Accept:"*/*","Content-Type":"application/x-www-form-urlencoded"},o.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.StatusBar&&StatusBar.styleDefault()})}function e(o,e){o.navigator.geolocation&&o.navigator.geolocation.getCurrentPosition(function(o){e.set("coordinates",{longitude:o.coords.longitude,latitude:o.coords.latitude})},function(o){console.log(o.message)},{enableHighAccuray:!0,timeout:5e3})}angular.module("commutrMobile.run").run(["$ionicPlatform","$http",o]).run(["$window","StorageService",e])}();