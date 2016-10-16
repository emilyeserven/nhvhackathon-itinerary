(function() {
	'use strict';

	angular.module('app').component("routeGroup", {
		controller:controller,
		templateUrl:"./app/trainRouteComponent/routeGroup.html",
		bindings:{
			ngModel:'='
		}
	});

	controller.$inject = [];

	function controller(){
		var $ctrl = this;

		$ctrl.groupOfRoutes = $ctrl.ngModel;
	}
})();