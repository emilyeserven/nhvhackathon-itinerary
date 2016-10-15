(function() {
	'use strict';

	angular.module('app').component('mainBrain', {
		controller: controller,
		templateUrl:"./app/mainBrainComponent/mainBrain.html",
	});

	controller.$inject = [];

	function controller(){
		var $ctrl = this;
		$ctrl.text = "Hello World";
	}
})();