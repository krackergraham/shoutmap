// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
		"async":				"bower_modules/requirejs-plugins/src/async",
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "knockout-postbox":     "bower_modules/knockout-postbox/build/knockout-postbox",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] }
    }
};
