(function() {
	'use strict';

	angular.module('app')
		.component('playground', {
			controller: controller,
			templateUrl:"./app/playground/playground.html",
		});

	controller.$inject = [];

	function controller(){
		var $ctrl = this;

		$ctrl.testArray = [];
		$ctrl.coolName = "";
		$ctrl.count = 42;
		
		$ctrl.showAlertGoofball = goofballFunk;
		$ctrl.addNameToArray = addNameToArray;

		$ctrl.$onInit = function(){
			console.log("this function runs as soon as <playground></playground> is loaded in the dom.");
			// you can use this area for setup.
		}

		function addNameToArray(){
			$ctrl.testArray.push($ctrl.coolName);
		}

		function goofballFunk(whoIsThis){
			alert("I see, you are. " + whoIsThis);
		}

	}

})();