angular.module('MainCtrl', ['uiGmapgoogle-maps'])
    .controller('MainController', function ($scope, uiGmapGoogleMapApi, Shouts) {
        // Default to Seattle
        $scope.map = {center: {latitude: 47.6097, longitude: 122.3331}, zoom: 13};
        $scope.markers = [];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    $scope.map.center = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                    $scope.markers.push({
                        coords: position.coords,
                        id: 1
                    });
                });
            });
        } else {
            alert("Your browser does not support location :(");
        }

        Shouts.get(function (shouts) {
            $scope.$apply(function () {
                for (var shout in shouts) {
                    $scope.markers.push({
                        coords: shout.coords,
                        id: shout._id
                    });
                }
            });
        });


        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function (maps) {

        });
    });