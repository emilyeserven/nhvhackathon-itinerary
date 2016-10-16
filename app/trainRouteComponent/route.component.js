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

		$ctrl.$onInit = function(){

			console.log("ngModelForRoute:", $ctrl.ngModel)

			var arrayOfSteps = $ctrl.ngModel.steps;
			$ctrl.routeDuration = $ctrl.ngModel.routeDuration;
			var niceSteps = [];

			for(var i = 0; i < arrayOfSteps.length; i++){
				var niceStep = {};
				var step = arrayOfSteps[i];
			
				niceStep.totalStops = step.num_stops;

				niceStep.lineName = step.line.name;
				niceStep.lineUrl = step.line.url;

				niceStep.lineStyle = {
						"color":step.line.text_color,
						"background-color":step.line.color,
					};
				
				niceStep.arrivalTime = step.arrival_time.text;
				niceStep.departureTime = step.departure_time.text;

				niceStep.arrivalStopName = step.arrival_stop.name;
				niceStep.departureStopName = step.departure_stop.name;

				niceStep.headsign = step.headsign;

				niceStep.agencies = step.line.agencies;

				niceStep.icon = step.line.vehicle.icon;
				niceStep.iconAltText = step.line.vehicle.name;
				niceStep.vehicle_type = step.line.vehicle.type;	

				niceSteps.push(niceStep);
			}

			$ctrl.niceSteps = niceSteps;
		}
	}
})();