(function() {
	'use strict';

	angular.module('app').component('mainBrain', {
		controller: controller,
		templateUrl:"./app/mainBrainComponent/secondBrain.html",
	});

	controller.$inject = ['$scope','$location','$state', '$stateParams', 'googleApi', 'moment', 'trainStationData'];

	function controller($scope, $location, $state, $stateParams, googleApi, moment, trainStationData){
		var $ctrl = this;

		$ctrl.text = "Hello!"

		var count = 0;

		$scope.$watch(function(){

				if (angular.isDefined($ctrl.chosenStation)){
					return $ctrl.chosenStation.station;
				}else{
					return $ctrl.chosenStation;
				}
			}, function(){
				// if (count > 2){
				// 	formatNewUrl();
				// }else{
				// 	count ++;
				// }
				formatNewUrl();
			}, true)

			$scope.$watch(function(){
				return $ctrl.at;
			}, function(){
				// if (count > 2){
				// 	formatNewUrl();
				// }else{
				// 	count ++;
				// }
				formatNewUrl();
			}, true)


		$ctrl.$onInit = function(){
			console.log($stateParams);
			$ctrl.from = $stateParams.origin;
			$ctrl.to = $stateParams.destination;
			$ctrl.at = $stateParams.time;

			$ctrl.listOfStations = trainStationData.getStations();

			$ctrl.chosenStation;

			$ctrl.timeStamp;

			$ctrl.eventIsOver;

			if((angular.isDefined($ctrl.at) && $ctrl.at.toLowerCase() === "now") || $stateParams.time == ""){
				console.log("Version 1");
				$ctrl.at = moment().toDate();
				$ctrl.eventIsOver = false;
			}else if (angular.isDefined($ctrl.at)){
				console.log("Version 2");
				$ctrl.at = formatDateString($ctrl.at);
				if ($ctrl.at.getTime() < Math.floor(new Date().getTime() / 1000)){
					$ctrl.eventIsOver = true;
				}
			}else{
				console.log("Version 3")
				// $ctrl.at = new Date(new moment());
				// $ctrl.eventIsOver = false;
				//$ctrl.at = new Date();
			}

			if (angular.isDefined($stateParams.destination) && $stateParams.destination !== ""){
				var station = trainStationData.getStation($stateParams.destination);
				if (station !== null){
					$ctrl.chosenStation = station;
					$ctrl.to = station.address;
				}
			}

			if (angular.isDefined($stateParams.origin) && $stateParams.origin !== ""){
				var station = trainStationData.getStation($stateParams.origin);
				if (station !== null){
					$ctrl.chosenStation = station;
					$ctrl.from = station.address;
				}
			}

			$ctrl.isParticipantMode = isFullParticipantMode();
			$ctrl.isOriginLookupMode = isOriginLookupMode();
			$ctrl.isOrganizerMode = isOrganizerMode();

			$ctrl.locateViaString = locateViaString;

			$ctrl.getListOfStations = getListOfStations;

			$ctrl.originTextSearch = originTextSearch;
			$ctrl.getGpsData = getGpsData;
			$ctrl.formatNewUrl = formatNewUrl;

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
					parseResponse(response);
				}).catch(function(error){
					$ctrl.hasError = true;
					console.error("error", error);
				}).finally(function(){
					isLoading = false;
				});
			}else if ($ctrl.isOriginLookupMode){
				console.log("(GPS) Origin Lookup Mode Detected.");
				if (angular.isUndefined($stateParams.destination) || $stateParams.destination === ""){
					$state.go("organizerMode");
					console.log("Leaving limbo.");
				}
			}else if ($ctrl.isOrganizerMode){
				console.log("Operator Mode Detected.");
			}else{
				$ctrl.isUnknownMode = true;
				console.log("Unknown Mode Detected.", $stateParams);
			}
		}// end oninit

		function compileEveryStation(){
			var stationList = trainStationData.getStations();
			for(var i = 0; i < stationList.length; i++){
				var station = stationList[i];
			}
		}

		function getData(from, to, at){
			$ctrl.noData = false;
			return googleApi.getAllData(from, to, at);
		}

		function triggerwait(){

		}

		function locateViaString(){
			$ctrl.noData = false;
			$ctrl.isLoading = true;
			$ctrl.hasSuccess = false;
			$ctrl.hasError = false;
			$ctrl.noData = false;
			getData($ctrl.originSearchString,$ctrl.to,formatTimestamp($ctrl.at)).then(function(response){
				$ctrl.hasSuccess = true;
				console.log("Success!", response);
				$ctrl.rawData = response;
				parseResponse(response);
			}).catch(function(error){
				$ctrl.hasError = true;
			}).finally(function(){
				$ctrl.isLoading = false;
			});
		}

		function getGpsData(){
			$ctrl.noData = false;
			$ctrl.isLoading = true;
			$ctrl.hasSuccess = false;
			$ctrl.hasError = false;
			$ctrl.noData = false;
			console.log("Started GPS Lookup.");
			// googleApi.reverseGeocode().then(function(response){
			// 	console.log("ReverseGeococe", response);
			// }).catch(function(err){
			// 	console.error("err", err);
			// });
			googleApi.getDataWithGPS($ctrl.to, formatTimestamp($ctrl.at)).then(function(response){
				console.log("Success!", response);
				$ctrl.rawData = response;
				if (response.data.response.result.status === "ZERO_RESULTS"){
				}
				parseResponse(response);
				$ctrl.hasSuccess = true;
				$ctrl.hasError = false;
				$ctrl.noData = false;
			}).catch(function(error){
				console.error("error", error);
				$ctrl.hasSuccess = false;
				$ctrl.hasError = true;
				$ctrl.noData = true;
			}).finally(function(){
				$ctrl.isLoading = false;
			})
		}

		function originTextSearch(){
			console.log("TODO: find a location based on:", $ctrl.originSearchString);
		}

		function _hasAllThree(){
			if (angular.isDefined($stateParams.origin) && ($stateParams.origin !== "") && angular.isDefined($stateParams.destination) && ($stateParams.destination !== "") && angular.isDefined($stateParams.time) && ($stateParams.time !== "")){
				return true;
			} else{
				return false;
			}
		}

		function hasNone(){
			if ((angular.isUndefined($stateParams.origin) || ($stateParams.origin === "")) && (angular.isUndefined($stateParams.destination) || ($stateParams.destination === "")) && (angular.isUndefined($stateParams.time) || ($stateParams.time === ""))){
				return true;
			}else{
				return false;
			}
		}

		function isOrganizerMode(){
			return hasNone() === true;
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

		function getListOfStations(){
			return trainStationData.getStations();;
		}

		function formatTimestamp(dateObj){
			if (angular.isDate(dateObj)){
				return Math.floor(dateObj.getTime() / 1000);
			}else{
				console.error("dateObject not a date object.", dateObj)
				return null;
			}
		}

		function parseResponse(responseObj){
			var possibleRoutes = responseObj.data.response.result.routes || [];
			var routeLegs = [];
			var railSteps = [];
			for(var i = 0; i < possibleRoutes.length; i++){
				var route = possibleRoutes[i];
				routeLegs.push(route.legs);
			}
			if (routeLegs.length > 0){
				// $ctrl.formattedResponse = routeLegs;
				for(var i = 0; i < routeLegs.length; i++){
					var legs = routeLegs[i];
					for(var j = 0; j < legs.length; j++){
						var leg = legs[j];
						var goodSteps = [];
						for(var k = 0; k < leg.steps.length; k++){
							var step = leg.steps[k];
							console.log("STEP", step);
							if (step.travel_mode === "TRANSIT"){
								goodSteps.push(step.transit_details);
							}
						}
						if (goodSteps.length > 0){
							var usefulData = {
								routeDuration: leg.duration.text,
								steps:goodSteps
							}
							railSteps.push(usefulData);
						}
					}
				}
				if(railSteps.length > 0){
					$ctrl.formattedResponse = railSteps;
					console.log("Formatted Response:", $ctrl.formattedResponse);
				}else{
					$ctrl.noData = true;
				}
			}else{
				$ctrl.noData = true;
			}
		}

		function formatNewUrl(){
			if($ctrl.chosenStation !== undefined){
				var host = "fromheretothereapp.com" //$location.host();
				var protocol = $location.protocol();
				var port = $location.port();

				var time = moment($ctrl.at).format("MMM-DD-YYYY-h:mma");

				//console.log("Chosen Station:", $ctrl.chosenStation.station);

				var destination = trainStationData.getUrlSafeName($ctrl.chosenStation.station);

				if (port === 80){
					port = "";
				}else{
					port = ":" + port;
				}

				var output = protocol + "://" + host + port + "/#/link/" + time + "/" + destination;
				//var output = "/#/link/" + time + "/" + destination;

				$ctrl.newUrl = output;
				//console.log("new Url Out:", output);
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
