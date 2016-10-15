(function() {
	'use strict';

	angular.module('app').component("beautifulPresent", {
		controller:controller,
		templateUrl:"./app/beautifulPresent/beautifulPresent.html",
	});

	controller.$inject = ['$stateParams'];

	function controller($stateParams){
		var $ctrl = this;

		$ctrl.text = "Beautiful Present, Hello!"

		$ctrl.$onInit = function(){
			console.log($stateParams);
			$ctrl.from = $stateParams.fromString;
			$ctrl.to = $stateParams.destString;
			$ctrl.at = $stateParams.dateTimeString;
			console.log("Beautiful present was loaded");
		}
	}
})();