(function() {
'use strict';

	angular
		.module('app')
		.factory('googleApi', googleApi)
	// 	.run(run);
	
	// run.$inject=['GAuth', 'GApi', 'GData', '$state', '$rootScope'];

	// function run(GAuth, GApi, GData, $state, $rootScope){
	// 	$rootScope.gdata = GData;
		
	// 		var CLIENT = 'yourGoogleAuthAPIKey';
	// 		var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';
	
	// 		GApi.load('myApiName','v1',BASE);
	// 		GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/) 
	
	// 		GAuth.setClient(CLIENT);
	// 		GAuth.setScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly"); // default scope is only https://www.googleapis.com/auth/userinfo.email 
		
	// 		// load the auth api so that it doesn't have to be loaded asynchronously 
	// 		// when the user clicks the 'login' button.  
	// 		// That would lead to popup blockers blocking the auth window 
	// 		GAuth.load();
			
	// 		// or just call checkAuth, which in turn does load the oauth api. 
	// 		// if you do that, GAuth.load(); is unnecessary 
	// 		GAuth.checkAuth().then(
	// 			function (user) {
	// 				console.log(user.name + 'is login')
	// 				// $state.go('webapp.home'); // an example of action if it's possible to 
	// 				// 			// authenticate user at startup of the application 
	// 			},
	// 			function() {
	// 				$state.go('login');       // an example of action if it's impossible to 
	// 					// authenticate user at startup of the application 
	// 			}
	// 		);
	// }

	googleApi.$inject = ['$http', '$q'];
	function googleApi($http, $q) {

		var service = {
			getData:getData
		};

		return service;

		////////////////

		function connectGapi(){
			gapi.client.helloWorld.greetings.listGreeting().execute(
				function(resp) {
					if (!resp.code) {
						console.debug(resp);
						$scope.greetings = resp.items;
						// Because it's a callback,
						// we need to notify angular of the data refresh...
						$scope.$digest();
					}
			});
		}

		function getData(from, to, at) { 

			//https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyDt7SOSEpRMaN1E9JIGphHsPp20HvrVKV4&transit_mode=rail&mode=transit

			return $q(function(resolve, reject){

				var params = {
					auth_token: "TTU1N0M5MEM5ODpzY3JpcHRyOjAwRUU4MEE3QzNENzI5ODAxQ0ZBOUIzNDEyQzZCMzQ1",
					from:from,
					to:to,
					at:at,
				}

				var options = {
					params: params,
				}
				resolve($http.get("https://api.scriptrapps.io/hack/getDirections", options));
			});
		}
	}
})();