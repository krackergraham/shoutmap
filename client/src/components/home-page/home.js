define(["knockout", "text!./home.html", 'async!http://maps.google.com/maps/api/js?sensor=false'], function (ko, homeTemplate) {

    function HomeViewModel(route) {
        var self = this;

        this.shouts = ko.observableArray();

        this.map = ko.observable();
        this.markers = ko.observableArray();
        this.shoutText = ko.observable();
        this.parentId = ko.observable();
        this.location = ko.observable();
        this.showDialog = ko.observable(false);
        this.isReply = ko.observable(false);
        this.btnText = ko.computed(function () {
            return self.isReply() ? 'Reply!' : 'Shout!';
        });

        // Initialize
        this.initializeMap();
        this.getLocation();
        this.getShouts();

        // Requests sent from nav bar
        ko.postbox.subscribe("getLocation", function () {
            self.getLocation();
            self.map().setZoom(14);
        }, this);

        ko.postbox.subscribe('showDialog', function () {
            self.showDialog('show');
        }, this);
    }

    HomeViewModel.prototype.initializeMap = function () {
        var mapOptions = {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 14,
            scaleControl: true,
            disableDefaultUI: true
        };
        this.map(new google.maps.Map(document.getElementById('map-canvas'), mapOptions));
    };

    HomeViewModel.prototype.getLocation = function () {
        var self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                self.location({lat: position.coords.latitude, long: position.coords.longitude});
                var pos = (new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                // Center the map on this location
                self.map().setCenter(pos);
            });
        } else {
            alert("Your browser does not support location :(");
        }
    };

    HomeViewModel.prototype.close = function () {
        this.showDialog('');
        this.shoutText('');
        this.parentId(null);
        this.isReply(false);
    };

    HomeViewModel.prototype.getShouts = function () {
        var self = this;
        $.get("http://localhost:3000/shouts", function (shouts) {
            if (shouts) {
                ko.utils.arrayForEach(shouts, function (shout) {




                    // Instantiate a marker
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(shout.location.lat, shout.location.long),
                        map: self.map(),
                        title: "Shout!" // TODO: Add title?
                    });

                    // add the marker to the markers collection
                    self.markers.push(marker);

                    // Add a click listener (for when the user clicks the marker)
                    google.maps.event.addListener(marker, 'click', function () {
                        // Request the replies for the shout
                        $.get("http://localhost:3000/replies/" + shout._id, function (replies) {
                            // Create the reply html containing div
                            var replyContent = '<div class="replies" id="replies-' + shout._id + '">';
                            // Iterate through the replies
                            ko.utils.arrayForEach(replies, function (reply) {
                                // and add the reply's text to the container
                                replyContent += '<p>' + reply.text + '</p>';
                            });
                            // close the reply div
                            replyContent += '</div>';

                            // Create the rest of the info window content html
                            var content =
                                '<div id="content">' +
                                '<div id="siteNotice">' + '</div>' +
                                '<h3 id="firstHeading">' + shout.text + '</h3>' +
                                '<div id="bodyContent">' +
                                replyContent +
                                '<p class="timestamp">' + new Date(shout.time).toLocaleString() + '</p>' +
                                '</div>' +
                                '<button id="reply-btn-' + shout._id + '" class="btn btn-default btn-sm btn-shout-back" data-shout=' + JSON.stringify(shout) + '>' + "Shout Back" + '</button>' +
                                '</div>';

                            // Instantiate the info window passing in the content
                            var infoWindow = new google.maps.InfoWindow({
                                content: content
                            });

                            // Add an event listener to the domready event on the infoWindow
                            google.maps.event.addListener(infoWindow, 'domready', function () {
                                // Get reference to the reply button based on shout id
                                var btn = document.getElementById('reply-btn-' + shout._id);
                                // apply knockout bindings to the button
                                ko.applyBindingsToNode(btn, { click: self.replyToShout }, self);

                                // Scroll to the bottom of the replies container
                                var replies = document.getElementById('replies-' + shout._id);
                                replies.scrollTop = replies.scrollHeight;
                            });

                            // Open the info window
                            infoWindow.open(self.map(), marker);
                        });
                    });
                });
            }
        })
    };

    HomeViewModel.prototype.clearMarkers = function () {
        ko.utils.arrayForEach(this.markers(), function (marker) {
            marker.setMap(null);
        })
    };

    HomeViewModel.prototype.shout = function () {
        var self = this;
        var shout = {
            text: this.shoutText(),
            location: this.location(),
            time: Date.now(),
            parentId: this.parentId()
        };

        var url = "http://localhost:3000/";
        url += this.isReply() ? 'reply' : 'shout';
        $.post(url, shout, function () {
            // Close the dialog
            self.close();
            console.log("Shout saved to service");
            self.clearMarkers();
            self.getShouts();
        });
    };

    HomeViewModel.prototype.replyToShout = function (shout, e) {
        var parent = JSON.parse(e.currentTarget.dataset.shout);

        this.parentId(parent._id);
        this.isReply(true);
        this.showDialog('show');
    };

    return { viewModel: HomeViewModel, template: homeTemplate };
})
;
