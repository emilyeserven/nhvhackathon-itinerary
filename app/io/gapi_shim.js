angular.module('myApp.services', [])
service('helloWorldService', [function() {
   this.loadData = function($scope)  {
     //Async call to google service
     gapi.client.helloWorld.greetings.listGreeting().execute(
        function(resp) {
            if (!resp.code) {
                console.debug(resp);
                $scope.greetings = resp.items;
                // Because it's a callback,
                // we need to notify angular of the data refresh...
                $scope.$digest();
            }
      });
   };
}]);