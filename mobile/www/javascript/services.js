CommuttrApp.factory("RouteService",["$http",function(t){return{search:function(e){return t.get("http://localhost:8000/api/v1.0/routes/search?query="+e)},get:function(e){return t.get("http://localhost:8000/api/v1.0/routes/get_route?route_id="+e)}}}]);