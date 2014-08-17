angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $http) {

  $scope.senddata = {};
  $scope.senddata.hostname = '192.168.1.13';
//  $scope.senddata.message = {format:"raw",freq:38,data:[18031,8755,1190,1190,1190,3341,1190,3341,1190,3341,1190,1190,1190,3341,1190,3341,1190,3341,1190,3341,1190,3341,1190,3341,1190,1190,1190,1190,1190,1190,1190,1190,1190,3341,1190,3341,1190,1190,1190,3341,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,1190,3341,1190,3341,1190,3341,1190,3341,1190,3341,1190,65535,0,9379,18031,4400,1190]};

        $scope.senddata.message  = '{"format":"raw","freq":38,"data":[6530,3297,825,867,823,867,822,2504,825,866,824,2502,873,819,871,820,871,819,870,2455,874,2454,874,818,871,819,872,818,871,2454,875,2453,875,817,873,817,872,818,873,817,873,818,872,818,872,818,872,818,873,817,873,817,873,817,873,817,873,818,873,2453,875,817,873,817,873,817,873,817,873,817,873,817,873,817,874,2452,876,816,873,817,873,818,873,817,873,2453,875,816,874,816,874,816,874,816,874,817,873,817,873,2452,877,815,874,2453,876,2450,877,2451,877,2451,876,2451,877,2450,877]}';

        $scope.postOut = {};

        // Perform the login action when the user submits the login form
  $scope.sendData = function() {
      if (! $scope.senddata.hostname) {
          alert( "fill hostname:" + $scope.senddata.hostname );
          return false;
      }
      if (! $scope.senddata.message) {
          alert( "fill Signal as JSON" );
          return false;
      }

      console.log('access connect hostname:'+$scope.senddata.hostname+' message:'+$scope.senddata.message);
     // connectIrkit.save({hostname:$scope.senddata.hostname})

      var url = 'http://'+ $scope.senddata.hostname +'/messages';

   /*   $http({
          method: 'post',
          url: 'http://' + $scope.senddata.hostname + '/messages',
          data: JSON.parse($scope.senddata.message),
          headers: {'Content-Type': 'application/json'}
      }).success(function(data, status, headers, config) {
          console.log('success: status:'+status);
      }).error(function(data, status, headers, config) {
          console.log('error: status:'+status);
      });

*/


      $http.post(url,  JSON.parse($scope.senddata.message)
      ).success(function(data, status, headers, config) {
              $scope.postOut.status = status;
              $scope.postOut.data = data;
              console.log('success: status:'+status);
          }).error(function(data, status, headers, config) {
                         $scope.postOut.status = 'error:' + status;

                         $scope.postOut.data = 'error:' + data;
              console.log('error: status:'+status);
          });

  };

  $scope.getData = function() {
      if (! $scope.senddata.hostname) {
          alert( "fill hostname:" + $scope.senddata.hostname );
          return false;
      }

      console.log('access connect hostname:'+$scope.senddata.hostname+' message:'+$scope.senddata.message)
      // connectIrkit.save({hostname:$scope.senddata.hostname})

      var url = 'http://'+ $scope.senddata.hostname +'/messages';
      $http.get(url).success(function(data, status, headers, config) {
              console.log('success: status:'+status + " data:"+data + " headers:"+headers + "config:"+config);

          }).error(function(data, status, headers, config) {
              console.log('error: status:'+status);
          });
  }


})
