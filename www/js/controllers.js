angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope) {
        $scope.header = {};
        $scope.senddata = {};
        $scope.header.title = 'Setting';
        $scope.irkitsettings = {};
        $scope.irkitsettings.hostname = '192.168.1.5';
        $scope.irkitsettings.url = generateURL($scope.irkitsettings.hostname);
        console.log('url:'+$scope.irkitsettings.url);
        function generateURL(hostname) {
            return 'http://'+ hostname +'/messages';
        }
    })

    .controller('SendCtrl', function($scope, $http) {

        $scope.header.title = 'Send Data';
        $scope.senddata.message  = '{"format":"raw","freq":38,"data":[6530,3297,825,867,823,867,822,2504,825,866,824,2502,873,819,871,820,871,819,870,2455,874,2454,874,818,871,819,872,818,871,2454,875,2453,875,817,873,817,872,818,873,817,873,818,872,818,872,818,872,818,873,817,873,817,873,817,873,817,873,818,873,2453,875,817,873,817,873,817,873,817,873,817,873,817,873,817,874,2452,876,816,873,817,873,818,873,817,873,2453,875,816,874,816,874,816,874,816,874,817,873,817,873,2452,877,815,874,2453,876,2450,877,2451,877,2451,876,2451,877,2450,877]}';

        // Perform the login action when the user submits the login form
        $scope.sendData = function() {
            if (! $scope.irkitsettings.url) {
                alert( "fill hostname !!");
                return false;
            }
            if (! $scope.senddata.message) {
                alert( "fill Signal as JSON" );
                return false;
            }

            console.log('access connect url:'+$scope.irkitsettings.url+' message:'+$scope.senddata.message);
            // connectIrkit.save({hostname:$scope.senddata.hostname})

            $http.post($scope.irkitsettings.url,  JSON.parse($scope.senddata.message)
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
    })

    .controller('GetCtrl', function($scope, $http) {
        $scope.header.title = 'Get Data';
        $scope.postOut = {};
        $scope.getData = function() {
            var resultJSON;
            if (! $scope.irkitsettings.url) {
                alert( "fill hostname!!");
                return false;
            }

            console.log('access connect url:'+$scope.irkitsettings.url);
            // connectIrkit.save({hostname:$scope.senddata.hostname})
            $http.get($scope.irkitsettings.url).success(function(data, status, headers, config) {
                console.log('success: status:'+status + " data:"+ data + " data.data;"+ data.data + " headers:"+headers + "config:"+config);
                if(data.data) {
                    resultJSON = {
                        format: "raw"
                        , freq: 38
                        , data: data.data
                    };
                    $scope.postOut.data = resultJSON;
                }

            }).error(function(data, status, headers, config) {
                console.log('error: status:'+status);
            });
        }
    })
