!function(){"use strict";function e(e,o){return{create:function(t,r,n,i,a,s,u){var l="route_name="+(t||"")+"&destination="+(r||"")+"&origin="+(n||"")+"&vice_versa="+(i||0);if(a.length>0)for(var c in a)a[c].location.length>0&&(l+="&via_route[]="+a[c].location);if(s.length>0)for(var p in s)l+="&mode_of_transportation[]="+s[p].id;if(u.length>0)for(var d=0;d<u.length;d++)l+="&coordinates["+d+"][latitude]="+u[d].latitude+"&coordinates["+d+"][longitude]="+u[d].longitude;return e.post("http://localhost:8000/api/v2.0/routes/create?user_id="+o.user().id,l)},search:function(o){return e.get("http://localhost:8000/api/v2.0/routes/search?keyword="+(o||""))},vehicles:function(){return e.get("http://localhost:8000/api/v2.0/transportation/vehicle_lists")}}}angular.module("commuttrApp.routesComponents").factory("RoutesComponentService",["$http","AuthService",e])}(),function(){"use strict";function e(){console.log("tada")}angular.module("commuttrApp.routesComponents").controller("RoutesController",[e])}(),function(){"use strict";function e(e,o,t){var r=this;r.vehicleLists=[],r.route=[],r.route.coordinates=[],r.route.vehicles=[],r.route.via_route=[{location:""}],r.formErrors=[],r.directionsService="",r.directionsRenderer="",r.map="",r.markers=[],r.polylines=[],r.isFirst=!0,e.vehicles().success(function(e){e.vehicles&&(r.vehicleLists=e.vehicles)}),r.addViaRoute=function(e){e.preventDefault(),r.route.via_route.push({location:""})},r.select=function(e,o){var t=o.indexOf(e);t>-1?o.splice(t,1):o.push(e)},r.exists=function(e,o){return o.indexOf(e)>-1},r.submitRoute=function(){r.fetchCoordinates(),r.formErrors=[];var t=r.route;e.create(t.route_name,t.destination,t.origin,t.vice_versa,t.via_route,t.vehicles,t.coordinates).success(function(e){e.route&&(r.clearForm(),o.show("You have successfully created the route.",5e3))}).error(function(e){o.show("There are errors encountered.",5e3),r.formErrors=e.errors.message})},r.clearForm=function(){r.route=[],r.route.coordinates=[],r.route.vehicles=[],r.route.via_route=[{location:""}],r.initializeGoogleMaps()},r.initializeGoogleMaps=function(){var e=t.get("coordinates"),o=new google.maps.LatLng(e.latitude,e.longitude);r.directionsService=new google.maps.DirectionsService,r.directionsRenderer=new google.maps.DirectionsRenderer,r.map=new google.maps.Map(document.getElementById("map_canvas"),{zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,center:o,mapTypeControl:!1,streetViewControl:!1}),r.directionsRenderer.setMap(r.map),google.maps.event.addListener(r.map,"click",function(e){r.addWayPointToRoute(e.latLng)})},r.addWayPointToRoute=function(e){r.isFirst?(r.addFirstWayPoint(e),r.isFirst=!1):r.appendWayPoint(e)},r.addFirstWayPoint=function(e){var o={origin:e,destination:e,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(e,o){if(o==google.maps.DirectionsStatus.OK){var t=new google.maps.Marker({position:e.routes[0].legs[0].start_location,map:r.map,draggable:!0});t.arrayIndex=0,r.markers.push(t),google.maps.event.addListener(t,"dragend",function(){r.recalculateRoute(t)})}})},r.appendWayPoint=function(e){var o={origin:r.markers[r.markers.length-1].position,destination:e,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(e,o){if(o==google.maps.DirectionsStatus.OK){var t=new google.maps.Marker({position:e.routes[0].legs[0].end_location,map:r.map,draggable:!0});r.markers.push(t),t.arrayIndex=r.markers.length-1,google.maps.event.addListener(t,"dragend",function(){r.recalculateRoute(t)});var n=new google.maps.Polyline({map:r.map,strokeColor:"#4986E7"}),i=e.routes[0].overview_path;for(var a in i)n.getPath().push(i[a]);n.setMap(r.map),r.polylines.push(n)}})},r.recalculateRoute=function(e){if(e.arrayIndex>0){r.polylines[e.arrayIndex-1].setMap(null);var o={origin:r.markers[e.arrayIndex-1].position,destination:e.position,travelMode:google.maps.DirectionsTravelMode.DRIVING};r.directionsService.route(o,function(o,t){if(t==google.maps.DirectionsStatus.OK){var n=new google.maps.Polyline({map:r.map,strokeColor:"#4986E7"}),i=o.routes[0].overview_path;for(var a in i)n.getPath().push(i[a]);n.setMap(r.map),r.polylines[e.arrayIndex-1]=n}})}},r.clearOverlays=function(){for(var e=0;e<r.markers.length;e++)r.markers[e].setMap(null);r.markers.length=0},r.fetchCoordinates=function(){if(r.markers.length>0)for(var e=0;e<r.markers.length;e++)r.route.coordinates.push({latitude:r.markers[e].getPosition().lat(),longitude:r.markers[e].getPosition().lng()})},r.initializeGoogleMaps()}angular.module("commuttrApp.routesComponents").controller("RoutesCreateController",["RoutesComponentService","ToastService","StorageService",e])}(),function(){"use strict"}(),function(){"use strict";function e(e,o,t,r){var n=this;n.map="",n.searchResults={},n.showResults=!1,n.keyword=o.keyword,r.search(o.keyword).success(function(e){e.results&&(n.searchResults=e.results,n.showResults=!0)}).error(function(e){}),n.goToRouteDetails=function(o){e.go("routes.details",{id:o.id})}}angular.module("commuttrApp.routesComponents").controller("RoutesSearchController",["$state","$stateParams","$window","RoutesComponentService",e])}();