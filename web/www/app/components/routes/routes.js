!function(){"use strict";function e(e,o,t){return{create:function(r,n,a,i,s,l,u){var c="route_name="+(r||"")+"&destination="+(n||"")+"&origin="+(a||"")+"&vice_versa="+(i||0);if(s.length>0)for(var g in s)s[g].location.length>0&&(c+="&via_route[]="+s[g].location);if(l.length>0)for(var p in l)c+="&mode_of_transportation[]="+l[p].id;if(u.length>0)for(var d=0;d<u.length;d++)c+="&coordinates["+d+"][latitude]="+u[d].latitude+"&coordinates["+d+"][longitude]="+u[d].longitude;return e.post(t.API_URL+"routes/create?user_id="+o.user().id,c)},search:function(o){return e.get(t.API_URL+"routes/search?keyword="+(o||""))},vehicles:function(){return e.get(t.API_URL+"transportation/vehicle_lists")}}}angular.module("commuttrApp.routesComponents").factory("RoutesComponentService",["$http","AuthService","CONFIG",e])}(),function(){"use strict";function e(){console.log("tada")}angular.module("commuttrApp.routesComponents").controller("RoutesController",[e])}(),function(){"use strict";function e(e,o,t){var r=this;r.vehicleLists=[],r.route=[],r.route.coordinates=[],r.route.vehicles=[],r.route.via_route=[{location:""}],r.formErrors=[],r.directionsService="",r.directionsRenderer="",r.map="",r.markers=[],r.polylines=[],r.isFirst=!0,e.vehicles().success(function(e){e.vehicles&&(r.vehicleLists=e.vehicles)}),r.addViaRoute=function(e){e.preventDefault(),r.route.via_route.push({location:""})},r.select=function(e,o){var t=o.indexOf(e);t>-1?o.splice(t,1):o.push(e)},r.exists=function(e,o){return o.indexOf(e)>-1},r.submitRoute=function(){r.fetchCoordinates(),r.formErrors=[];var t=r.route;e.create(t.route_name,t.destination,t.origin,t.vice_versa,t.via_route,t.vehicles,t.coordinates).success(function(e){e.route&&(r.clearForm(),o.show("You have successfully created the route.",5e3))}).error(function(e){o.show("There are errors encountered.",5e3),r.formErrors=e.errors.message})},r.clearForm=function(){r.route=[],r.route.coordinates=[],r.route.vehicles=[],r.route.via_route=[{location:""}],r.initializeGoogleMaps()},r.initializeGoogleMaps=function(){var e=t.get("coordinates"),o=new google.maps.LatLng(e.latitude,e.longitude);r.directionsService=new google.maps.DirectionsService,r.directionsRenderer=new google.maps.DirectionsRenderer,r.map=new google.maps.Map(document.getElementById("map_canvas"),{zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,center:o,mapTypeControl:!1,streetViewControl:!1}),r.directionsRenderer.setMap(r.map),google.maps.event.addListener(r.map,"click",function(e){r.addWayPointToRoute(e.latLng)})},r.addWayPointToRoute=function(e){r.isFirst?(r.addFirstWayPoint(e),r.isFirst=!1):r.appendWayPoint(e)},r.addFirstWayPoint=function(e){var o={origin:e,destination:e,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(e,o){if(o==google.maps.DirectionsStatus.OK){var t=new google.maps.Marker({position:e.routes[0].legs[0].start_location,map:r.map,draggable:!0});t.arrayIndex=0,r.markers.push(t),google.maps.event.addListener(t,"dragend",function(){r.recalculateRoute(t)})}})},r.appendWayPoint=function(e){var o={origin:r.markers[r.markers.length-1].position,destination:e,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(e,o){if(o==google.maps.DirectionsStatus.OK){var t=new google.maps.Marker({position:e.routes[0].legs[0].end_location,map:r.map,draggable:!0});r.markers.push(t),t.arrayIndex=r.markers.length-1,google.maps.event.addListener(t,"dragend",function(){r.recalculateRoute(t)});var n=new google.maps.Polyline({map:r.map,strokeColor:"#4986E7"}),a=e.routes[0].overview_path;for(var i in a)n.getPath().push(a[i]);n.setMap(r.map),r.polylines.push(n)}})},r.recalculateRoute=function(e){if(e.arrayIndex>0){r.polylines[e.arrayIndex-1].setMap(null);var o={origin:r.markers[e.arrayIndex-1].position,destination:e.position,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(o,t){if(t==google.maps.DirectionsStatus.OK){var n=new google.maps.Polyline({map:r.map,strokeColor:"#4986E7"}),a=o.routes[0].overview_path;for(var i in a)n.getPath().push(a[i]);n.setMap(r.map),r.polylines[e.arrayIndex-1]=n}})}},r.clearOverlays=function(){for(var e=0;e<r.markers.length;e++)r.markers[e].setMap(null);r.markers.length=0},r.fetchCoordinates=function(){if(r.markers.length>0)for(var e=0;e<r.markers.length;e++)r.route.coordinates.push({latitude:r.markers[e].getPosition().lat(),longitude:r.markers[e].getPosition().lng()})},r.initializeGoogleMaps()}angular.module("commuttrApp.routesComponents").controller("RoutesCreateController",["RoutesComponentService","ToastService","StorageService",e])}(),function(){"use strict"}(),function(){"use strict";function e(e,o,t,r,n){var a=this;a.map="",a.results=[],a.showResults=!1,a.keyword=o.keyword,a.showRouteDetails=!1,a.routeDetails=[];var i,s,l;t.search(o.keyword).success(function(e){e.results.length>0&&(a.results=e.results,a.showResults=!0,a.loadRoute(a.results[0].coordinates)),r.hide()}).error(function(e){}),a.goToRouteDetails=function(e){a.showRouteDetails=!0,a.routeDetails=e,a.initializeMaps(),a.loadRoute(e.coordinates)},a.goBackToResults=function(){a.showRouteDetails=!1},a.initializeMaps=function(){r.show("Loading...");var e=n.get("coordinates"),o=new google.maps.LatLng(e.latitude,e.longitude);a.map=new google.maps.Map(document.getElementById("map_canvas"),{zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,center:o,mapTypeControl:!1,streetViewControl:!1})},a.loadRoute=function(e){for(var o=[],t=new google.maps.LatLngBounds,n=0;n<e.length;n++)o.push(new google.maps.LatLng(e[n].latitude,e[n].longitude)),t.extend(new google.maps.LatLng(e[n].latitude,e[n].longitude));a.map.setCenter(t.getCenter()),a.map.fitBounds(t),i=new google.maps.MVCArray,s=new google.maps.DirectionsService,l=new google.maps.Polyline({map:a.map,strokeColor:"#4986E7"});for(var n=0;n<o.length;n++)if(n+1<o.length){var u={origin:o[n],destination:o[n+1],travelMode:google.maps.DirectionsTravelMode.TRANSIT};s.route(u,function(e,o){if(o==google.maps.DirectionsStatus.OK){var t=e.routes[0].overview_path;for(var r in t)l.getPath().push(t[r]);l.setMap(a.map),i.push(l)}})}r.hide()},a.initializeMaps()}angular.module("commuttrApp.routesComponents").controller("RoutesSearchController",["$state","$stateParams","RoutesComponentService","ToastService","StorageService",e])}();