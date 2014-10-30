define(['knockout', 'text!./nav-bar.html'], function (ko, template) {

    function NavBarViewModel(params) {
        this.route = params.route;
    }

    NavBarViewModel.prototype.getLocation = function () {
        ko.postbox.publish("getLocation", true);
    };

    NavBarViewModel.prototype.shout = function () {
        ko.postbox.publish("showDialog", true);
    };


    return { viewModel: NavBarViewModel, template: template };
});
