(function() {
	'use strict';

	angular.module('app').config(configuration);

	configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configuration($stateProvider, $urlRouterProvider){

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