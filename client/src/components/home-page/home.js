define(["knockout", "text!./home.html", 'async!http://maps.google.com/maps/api/js?sensor=false'], function (ko, homeTemplate) {

    function HomeViewModel(route) {
        var self = this;
        this.shoutText = ko.observable();
        this.position = ko.observable();

        var mapOptions = {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 12
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                self.position(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

                // TODO: load shouts from service
                var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: self.position(),
                    content: 'Location found using HTML5.'
                });

                map.setCenter(self.position());
            });
        }
    }

    HomeViewModel.prototype.addShout = function () {
        var shout = {
            text: this.shoutText()
        };
        $.post("http://localhost:3000/shout", shout, function () {
            console.log("Shout saved to service")
        })
    };

    return { viewModel: HomeViewModel, template: homeTemplate };
});
