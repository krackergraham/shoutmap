var app = require('./app'),
    logger = require('./logger'),
    dbConnector = require('./dbConnector');

dbConnector.connect();
// Spin up the app on the designated port
app.listen(app.get('port'), function () {
    logger.log("Express server listening on port " + app.get('port'));
});
