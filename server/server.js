var app = require('./app'),
    chalk = require('chalk');

// Spin up the app on the designated port
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + chalk.cyan(app.get('port')));
});



