(function() {
'use strict';

	angular
		.module('app')
		.factory('googleApi', googleApi)

	googleApi.$inject = ['$http', '$q', 'geolocation'];
	function googleApi($http, $q, geolocation) {

		var scriptrToken = "TTU1N0M5MEM5ODpzY3JpcHRyOjAwRUU4MEE3QzNENzI5ODAxQ0ZBOUIzNDEyQzZCMzQ1";

		var service = {
			reverseGeocode:reverseGeocode,
			getAllData:getAllData,
			getDataWithGPS:getDataWithGPS,
		};

		return service;

		////////////////

		function reverseGeocode(){
			return $q(function(resolve, reject){
				geolocation.getLocation().then(function(locationResponse){
					var lat = locationResponse.coords.latitude;
					var lng = locationResponse.coords.longitude;

					var params = {
						auth_token: scriptrToken,
						lat: lat,
						lng: lng,
					}

					resolve($http.get("https://api.scriptrapps.io/hack/addressFromLatLng", {params:params}))
				}).catch(reject);
			})
		}

		function getAllData(origin, destination, arrival_time) { 

			//https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDt7SOSEpRMaN1E9JIGphHsPp20HvrVKV4&transit_mode=rail&mode=transit

			return $q(function(resolve, reject){

				var params = {
					auth_token: scriptrToken,
					origin:origin,
					destination:destination,
					arrival_time:arrival_time,
				}

				resolve($http.get("https://api.scriptrapps.io/hack/getDirections", {params:params}));
			});
		}// end get all data.

		function getDataWithGPS(destination, arrival_time){
			return $q(function(resolve,reject){
				geolocation.getLocation().then(function(locationResponse){

					var lat = locationResponse.coords.latitude;
					var lng = locationResponse.coords.longitude;

					var params = {
						auth_token: scriptrToken,
						destination:destination,
						arrival_time:arrival_time,
						origin: lat + "," + lng,
					}

					resolve($http.get("https://api.scriptrapps.io/hack/getDirections", {params:params}));

					//console.log("Location Found:", locationResponse);
				}).catch(reject)
			})
		}
	}
})();