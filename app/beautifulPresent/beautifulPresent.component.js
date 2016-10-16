(function() {
	'use strict';

	angular.module('app').component("beautifulPresent", {
		controller:controller,
		templateUrl:"./app/beautifulPresent/beautifulPresent.html",
	});

	controller.$inject = ['$state', '$stateParams', 'googleApi'];

	function controller($state, $stateParams, googleApi){
		var $ctrl = this;

		// $ctrl.text = "Beautiful Present, Hello!"

	}
})();