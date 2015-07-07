!function(){"use strict";function e(e,t,o,a,r){var n=this;n.map="",n.results=[],n.showResults=!1,n.keyword=t.keyword,n.showRouteDetails=!1,n.routeDetails=[];var s,i,u;r.search(t.keyword).success(function(e){e.results.length>0&&(n.results=e.results,n.showResults=!0,n.loadRoute(n.results[0].coordinates)),o.hide()}).error(function(e){}),n.goToRouteDetails=function(e){n.showRouteDetails=!0,n.routeDetails=e,n.initializeMaps(),n.loadRoute(e.coordinates)},n.goBackToResults=function(){n.showRouteDetails=!1},n.initializeMaps=function(){o.show("Loading...");var e=a.get("coordinates"),t=new google.maps.LatLng(e.latitude,e.longitude);n.map=new google.maps.Map(document.getElementById("map_canvas"),{zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,center:t,mapTypeControl:!1,streetViewControl:!1})},n.loadRoute=function(e){for(var t=[],a=new google.maps.LatLngBounds,r=0;r<e.length;r++)t.push(new google.maps.LatLng(e[r].latitude,e[r].longitude)),a.extend(new google.maps.LatLng(e[r].latitude,e[r].longitude));n.map.setCenter(a.getCenter()),n.map.fitBounds(a),s=new google.maps.MVCArray,i=new google.maps.DirectionsService,u=new google.maps.Polyline({map:n.map,strokeColor:"#4986E7"});for(var r=0;r<t.length;r++)if(r+1<t.length){var l={origin:t[r],destination:t[r+1],travelMode:google.maps.DirectionsTravelMode.TRANSIT};i.route(l,function(e,t){if(t==google.maps.DirectionsStatus.OK){var o=e.routes[0].overview_path;for(var a in o)u.getPath().push(o[a]);u.setMap(n.map),s.push(u)}})}o.hide()},n.initializeMaps()}angular.module("commuttrApp.components.routeSearch").controller("RouteSearchController",["$state","$stateParams","ToastService","StorageService","RouteSearchService",e])}(),function(){"use strict";function e(e,t){return{search:function(o){return e.get(t.API_URL+"routes/search?keyword="+(o||""))}}}angular.module("commuttrApp.components.routeSearch").factory("RouteSearchService",["$http","CONFIG",e])}();