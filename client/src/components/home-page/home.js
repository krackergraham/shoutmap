define(["knockout", "text!./home.html", 'async!http://maps.google.com/maps/api/js?sensor=false'], function (ko, homeTemplate) {

	function HomeViewModel(route) {
		this.initialize();
	}

	HomeViewModel.prototype.initialize = function () {
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
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Location found using HTML5.'
				});

				map.setCenter(pos);
			});
		}
	}

	return {
		viewModel: HomeViewModel,
		template: homeTemplate
	};

});