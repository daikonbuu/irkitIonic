/**
 * Created by daisuke on 2014/08/13.
 */
angular.module('starter.services', ['ngResource'])

    .factory('ConnectIRKit', ['$resource', function($resource) {
        var url = 'http://:hostname/messages';
        console.log(url);
        return $resource(url);
    }])
