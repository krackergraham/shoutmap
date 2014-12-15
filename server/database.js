var mongoose = require('mongoose'),
    chalk = require('chalk');

module.exports = {
    connect: function () {
        // Get the db url depending on environment and connect to it
        var dbUrl = process.env.NODE_ENV === "production" ? process.env.MONGOHQ_URL : 'mongodb://localhost/shoutmap';
        console.log('Connecting to MongoDB at: ' + dbUrl);
        mongoose.connect(dbUrl);

        // Handle db connection events
        var connection = mongoose.connection;
        connection.on('error', function (err) {
            if (err) {
                console.log(chalk.red(err));
            }
        });
        connection.once('open', function callback() {
            console.log('Successfully connected to MongoDB: ' + connection.name);
        });
    }
};
