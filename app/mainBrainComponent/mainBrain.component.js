(function() {
	'use strict';

	angular.module('app').component('mainBrain', {
		controller: controller,
		templateUrl:"./app/mainBrainComponent/mainBrain.html",
	});

	controller.$inject = ['$state', '$stateParams', 'googleApi', 'moment'];

	function controller($state, $stateParams, googleApi, moment){
		var $ctrl = this;

		// $ctrl.text = "Beautiful Present, Hello!"

		$ctrl.$onInit = function(){
			console.log($stateParams);
			$ctrl.from = $stateParams.origin;
			$ctrl.to = $stateParams.destination;
			$ctrl.at = $stateParams.time;

			$ctrl.timeStamp;

			if((angular.isDefined($ctrl.at) && $ctrl.at.toLowerCase() === "now") || $stateParams.time == ""){
				$ctrl.at = new Date();
			}else if (angular.isDefined($ctrl.at)){
				$ctrl.at = formatDateString($ctrl.at);
			}else{
				$ctrl.at = new Date();
			}

			$ctrl.isParticipantMode = isFullParticipantMode();
			$ctrl.isOriginLookupMode = isOriginLookupMode();
			$ctrl.isOrganizerMode = isOrganizerMode();

			$ctrl.isUnknownMode = false;

			$ctrl.isLoading = false;
			$ctrl.hasError = false;
			$ctrl.hasSuccess = false;
			$ctrl.noData = false;
			
			if ($ctrl.isParticipantMode){
				console.log("Full Participant Mode Detected. Polling Google for data.");
				$ctrl.isLoading = true;
				getData($ctrl.from, $ctrl.to, formatTimestamp($ctrl.at)).then(function(response){
					$ctrl.hasSuccess = true;
					console.log("Success!", response);
					$ctrl.rawData = response;
				}).catch(function(error){
					$ctrl.hasError = true;
					console.error("error", error);
				}).finally(function(){
					isLoading = false;
				});
			}else if ($ctrl.isOriginLookupMode){
				console.log("(GPS) Origin Lookup Mode Detected. Polling Google for data.");
				googleApi.getDataWithGPS($ctrl.to, formatTimestamp($ctrl.at)).then(function(response){
					console.log("Success!", response);
					$ctrl.rawData = response;
				}).catch(function(error){
					console.error("error", error);
				})
			}else if ($ctrl.isOrganizerMode){
				console.log("Operator Mode Detected.");

			}else{
				$ctrl.isUnknownMode = true;
				console.log("Unknown Mode Detected.", $stateParams);
			}
		}

		function getData(from, to, at){
			return googleApi.getAllData(from, to, at);
		}

		function _hasAllThree(){
			if (angular.isDefined($stateParams.origin) && ($stateParams.origin !== "") && angular.isDefined($stateParams.destination) && ($stateParams.destination !== "") && angular.isDefined($stateParams.time) && ($stateParams.time !== "")){
				return true;
			} else{
				return false;
			}
		}

		function isOrganizerMode(){
			return _hasAllThree() === false;
		}

		function isFullParticipantMode(){
			return _hasAllThree();
		}

		function isOriginLookupMode(){
			if((angular.isUndefined($stateParams.origin) || ($stateParams.origin === "")) && angular.isDefined($stateParams.destination) && angular.isDefined($stateParams.time)){
				return true;
			}else{
				return false;
			}
		}

		function formatTimestamp(dateObj){
			if (angular.isDate(dateObj)){
				return Math.floor(dateObj.getTime() / 1000);
			}else{
				console.error("dateObject not a date object.", dateObj)
				return null;
			}
		}

		function formatDateString(inputString){
			// we should expect the format to be: nov-26-2042-04-12-pm

			var dateFormats = [
				'MM-DD-YYYY-hmmA','MM-DD-YYYY-Hmm','MM-DD-YYYY-H:mm','MM-DD-YYYY-h:mmA',
				'MMM-DD-YYYY-hmmA','MMM-DD-YYYY-Hmm','MMM-DD-YYYY-H:mm','MMM-DD-YYYY-h:mmA',
				'MMMM-DD-YYYY-hmmA','MMMM-DD-YYYY-Hmm','MMMM-DD-YYYY-H:mm','MMMM-DD-YYYY-h:mmA',
				'YYYY-MM-DD-hmmA','YYYY-MM-DD-Hmm','YYYY-MM-DD-H:mm','YYYY-MM-DD-h:mmA',
				'YYYY-MMM-DD-hmmA','YYYY-MMM-DD-Hmm','YYYY-MMM-DD-H:mm','YYYY-MMM-DD-h:mmA',
				'YYYY-MMMM-DD-hmmA','YYYY-MMMM-DD-Hmm','YYYY-MMMM-DD-H:mm','YYYY-MMMM-DD-h:mmA',
				'MM-DD-YYYY-hmma','MM-DD-YYYY-Hmm','MM-DD-YYYY-H:mm','MM-DD-YYYY-h:mma',
				'MMM-DD-YYYY-hmma','MMM-DD-YYYY-Hmm','MMM-DD-YYYY-H:mm','MMM-DD-YYYY-h:mma',
				'MMMM-DD-YYYY-hmma','MMMM-DD-YYYY-Hmm','MMMM-DD-YYYY-H:mm','MMMM-DD-YYYY-h:mma',
				'YYYY-MM-DD-hmma','YYYY-MM-DD-Hmm','YYYY-MM-DD-H:mm','YYYY-MM-DD-h:mma',
				'YYYY-MMM-DD-hmma','YYYY-MMM-DD-Hmm','YYYY-MMM-DD-H:mm','YYYY-MMM-DD-h:mma',
				'YYYY-MMMM-DD-hmma','YYYY-MMMM-DD-Hmm','YYYY-MMMM-DD-H:mm','YYYY-MMMM-DD-h:mma',
				];

			var coolDate = moment(inputString, dateFormats);
			var isvalid = coolDate.isValid();
			if (isvalid){
				return coolDate.toDate();
			}else{
				console.log("Error", coolDate, inputString);
				return null;
			}
		}
	}// end controller
})();