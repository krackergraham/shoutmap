define(["knockout", "text!./home.html", 'async!http://maps.google.com/maps/api/js?sensor=false'], function (ko, homeTemplate) {

	function HomeViewModel(route) {
		this.message = ko.observable('Welcome to Shoutmap!');
	}

	HomeViewModel.prototype.doSomething = function () {
		this.message('You invoked doSomething() on the viewmodel.');
	};

	return {
		viewModel: HomeViewModel,
		template: homeTemplate
	};

});