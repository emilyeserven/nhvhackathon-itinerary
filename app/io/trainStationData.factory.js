(function() {
'use strict';

	angular
		.module('app')
		.factory('trainStationData', trainStationData);

	trainStationData.$inject = [];
	function trainStationData() {


		function cleanedStationName(){
			var name = this.station.toLowerCase();
			var fixed = "";
			for(var i = 0; i < name.length; i++){
				var char = name[i];
				if (char === " "){
					fixed += "-"; 
				}else{
					fixed += char;
				}
			}
			return fixed;
		}

		var essentialStations = [{
			station:"New Haven (Union Station)",
			address:"50 Union Ave, New Haven, CT 06519",
		},{
			station:"West Haven",
			address:"20 Railroad Ave, West Haven, CT 06516",
		},{
			station:"Milford",
			address:"1 Railroad Avenue, Milford, CT 06460",
		},{
			station:"Bridgeport",
			address:"525 Water St, Bridgeport, CT 06604",
		},{
			station:"Fairfield Metro",
			address:"61 Constant Comment Way, Fairfield CT 06824"
		},{
			station:"Westport",
			address:"1 Railroad Place, Westport, CT 06880"
		},{
			station:"South Norwalk",
			address:"29 Monroe Street at 1 Chestnut Street, Norwalk, CT 06854"
		},{
			station:"Darien",
			address:"33 West Avenue, Darien, CT 06820"
		},{
			station:"New Canaan",
			address:"198 Elm St, New Canaan, CT 06840"
		},{
			station:"Stamford",
			address:"Washington Blvd, Stamford, CT 06902"
		},{
			station:"Greenwich",
			address:"20 Railroad Avenue, Greenwich, CT 06830"
		},{
			station:"New Rochelle",
			address:"1 Penn Central Railroad, New Rochelle, NY 10801-6353"
		},{
			station:"Harlem 125th Street",
			address:"101 East 125th Street and 1818 Park Avenue East Harlem, New York, NY 10035"
		},{
			station:"Fordham",
			address:"417 East Fordham Road (190th Street) Fordham, Bronx, New York 10458"
		},{
			station:"Grand Central Terminal",
			address:"89 E 42nd St, New York, NY 10017"
		}]

		var service = {
			getStations:getStations,
			getUrlSafeName:getUrlSafeName,
			getStation:getStation,
		};
		
		return service;

		////////////////
		function getStations() { 
			return essentialStations;
		}
		function getUrlSafeName(inputString){
			var re = /\W/g;
			if(typeof inputString === "string"){
				var newName = inputString.replace(re,'-');
				return newName.toLowerCase();
			}else{
				return null;
			}
		
		}

		function getStation(testStringFromUrl){
			var stationNames = [];
			for(var i = 0; i < essentialStations.length; i++){
				var name = essentialStations[i].station;
				name = getUrlSafeName(name);
				stationNames.push(name);
			}

			var stationIndex = -1;

			//console.log("stationNames", stationNames);

			for(var j = 0; j < stationNames.length; j++){
				var formattedName = stationNames[j];
				if (formattedName === testStringFromUrl){
					stationIndex = j;
					break;
				}
			}

			if (stationIndex !== -1){
				return essentialStations[stationIndex]
			}else{
				console.info(testStringFromUrl, "is not a known station.");
				return null;
			}
		}
	}
})();