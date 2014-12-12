var logger = require('./logger'),
    mongoose = require('mongoose');

var dbConnector = module.exports;

dbConnector.connect = function () {
    // Get the db url depending on environment and connect to it
    var dbUrl = process.env.NODE_ENV === "production" ? process.env.MONGOHQ_URL : 'mongodb://localhost/shoutmap';
    logger.log('Connecting to MongoDB at: ' + dbUrl);
    mongoose.connect(dbUrl);

    // Handle db connection events
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', function callback() {
        logger.success('Connected to MongoDB: ' + db.name);
    });
};