
(function() {
	'use strict';

	angular.module('app').config(configuration);

	configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', "$locationProvider"];

	function configuration($stateProvider, $urlRouterProvider, $httpProvider,$locationProvider){

		// $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$urlRouterProvider.otherwise("/organizer");

		$urlRouterProvider.when('', '/organizer');

		var organizerMode = {
			name:"organizerMode",
			url:"/organizer",
			template:"<main-brain></main-brain>"
		}

		var fromToAt = {
			name:"fromToAt",
			url:"/travel/from/{origin}/to/{destination}/at/{time}",
			template:"<main-brain></main-brain>"
		}
		var fromAtTo = {
			name:"fromAtTo",
			url:"/travel/from/{origin}/at/{time}/to/{destination}",
			template:"<main-brain></main-brain>"
		}
		var toFromAt = {
			name:"toFromAt",
			url:"/travel/to/{destination}/from/{origin}/at/{time}",
			template:"<main-brain></main-brain>"
		}
		var toAtFrom = {
			name:"toAtFrom",
			url:"travel/to/{destination}/at/{time}/from/{origin}",
			template:"<main-brain></main-brain>"
		}
		var atToFrom = {
			name:"atToFrom",
			url:"/travel/at/{time}/to/{destination}/from/{origin}",
			template:"<main-brain></main-brain>"
		}
		var atFromTo = {
			name:"atFromto",
			url:"/travel/at/{time}/from/{origin}/to/{destination}",
			template:"<main-brain></main-brain>"
		}

		var fromTo = {
			name:"fromTo",
			url:"/travel/from/{origin}/to/{destination}",
			template:"<main-brain></main-brain>"
		}
		var toFrom = {
			name:"toFrom",
			url:"/travel/to/{destination}/from/{origin}",
			template:"<main-brain></main-brain>"
		}

		var toOnly = {
			name:"toOnly",
			url:"/travel/to/{destination}",
			template:"<main-brain></main-brain>"
		}

		var toAt = {
			name:"toAt",
			url:"/travel/to/{destination}/at/{time}",
			template:"<main-brain></main-brain>"
		}

		var participantMode = {
			name:"participantMode",
			url:'/link/{time}/{destination}/{origin}',
			template:"<main-brain></main-brain>"
		}

		var lookupMode = {
			name:"lookupMode",
			url:"/link/{time}/{destination}",
			template:"<main-brain></main-brain>"
		}

		// var playground = {
		// 	name:"playground",
		// 	url:"/playground",
		// 	template:"<playground></playground>"
		// }

		$stateProvider
			.state(organizerMode) // organizer mode
			.state(participantMode) 
			.state(lookupMode) // participant with gps lookup

			.state(toOnly) // easteregg search modes
			.state(toAt)   // easteregg search modes
			.state(fromTo) // easteregg search modes
			.state(toFrom) // easteregg search modes
			.state(fromAtTo) // easteregg search modes
			.state(fromToAt) // easteregg search modes
			.state(toAtFrom) // easteregg search modes
			.state(toFromAt) // easteregg search modes
			.state(atToFrom) // easteregg search modes
			.state(atFromTo) // easteregg search modes
			//.state(playground);
	}
})();