
(function() {
	'use strict';

	angular.module('app').config(configuration);

	configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

	function configuration($stateProvider, $urlRouterProvider, $httpProvider){

		// $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$urlRouterProvider.otherwise('/');

		var homeState = {
			name:"home",
			url:"/",
			template:"<main-brain></main-brain>"
		}

		var fromToAt = {
			name:"fromToAt",
			url:"/from/{fromString}/to/{destString}/at/{dateTimeString}",
			template:"<beautiful-present></beautiful-present>"
		}

		var playground = {
			name:"playground",
			url:"/playground",
			template:"<playground></playground>"
		}

		$stateProvider
			.state(homeState)
			.state(fromToAt)
			.state(playground);
	}
})();