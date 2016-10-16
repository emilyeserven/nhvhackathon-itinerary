(function() {
	'use strict';

	angular.module('app').component("trainRoute", {
		controller:controller,
		templateUrl:"./app/trainRouteComponent/route.html",
		bindings:{
			ngModel:'=',
		}
	});

	controller.$inject = [];

	function controller(){
		var $ctrl = this;

		$ctrl.totalStops = $ctrl.ngModel.num_stops;

		$ctrl.lineName = $ctrl.ngModel.line.name;
		$ctrl.lineUrl = $ctrl.ngModel.line.url;

		$ctrl.lineStyle = {
				"color":$ctrl.ngModel.line.text_color,
				"background-color":$ctrl.ngModel.line.color,
			};
		
		$ctrl.arrivalTime = $ctrl.arrival_time.text;
		$ctrl.departureTime = $ctrl.departure_time.text;

		$ctrl.arrivalStopName = $ctrl.arrival_stop.name;
		$ctrl.departureStopName = $ctrl.departure_Stop.name;

		$ctrl.headsign = $ctrl.headsign;

		$ctrl.agencies = $ctrl.line.agencies;

		$ctrl.icon = $ctrl.line.vehicle.icon;
		$ctrl.iconAltText = $ctrl.line.vehicle.name;
		$ctrl.vehicle_type = $ctrl.line.vehicle.type;
	}
})();