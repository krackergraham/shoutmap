// Dependencies
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    logger = require('./logger'),
    path = require('path'),
    router = require('./api/routes');

var app = module.exports = express();

logger.log('App initializing...');

// Set the port
app.set('port', process.env.PORT || 3000);

// enable CORS
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());
app.use(logger.request);    // Logout all incoming requests
// Setup Routes ========
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../public/')));
