// public/js/services/ShoutService.js
angular.module('ShoutService', []).factory('Shouts', ['$http', function ($http) {
    return {
        // call to get all shouts
        get: function () {
            return $http.get('/api/shouts');
        },

        // call to POST and create a new shout
        create: function (shoutData) {
            return $http.post('/api/shouts', shoutData);
        }
    };
}]);