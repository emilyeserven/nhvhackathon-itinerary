(function() {
	'use strict';

	angular.module('app').component("beautifulPresent", {
		controller:controller,
		templateUrl:"./app/beautifulPresent/beautifulPresent.html",
	});

	controller.$inject = ['$stateParams', 'googleApi'];

	function controller($stateParams, googleApi){
		var $ctrl = this;

		$ctrl.text = "Beautiful Present, Hello!"

		$ctrl.$onInit = function(){
			console.log($stateParams);
			$ctrl.from = $stateParams.fromString;
			$ctrl.to = $stateParams.destString;
			$ctrl.at = $stateParams.dateTimeString;
			console.log("Beautiful present was loaded");

			getData('new haven, ct', 'hartford, ct', 392939492).then(function(response){
				console.log("Success!", response);
				$ctrl.rawData = response;
			}).catch(function(error){
				console.error("error", error);
			});

		}

		function getData(from, to, at){
			return googleApi.getData(from, to, at);
		}

	}
})();