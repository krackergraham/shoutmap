// Dependencies
var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    database = require('./db/connector');
router = require('./api/routes');

var app = module.exports = express();

console.log('App initializing...');

database.connect();                                             // Connect to the database

app.set('port', process.env.PORT || 3000);                      // Set the port

app.use(cors());                                                // enable CORS
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));   // parse application/vnd.api+json as json
app.use(morgan('dev'));                                         // log all incoming requests
app.use(express.static(path.join(__dirname, '../public')));     // serve static files from the public directory
app.use('/api', router);                                        // setup Routes
app.get('*', function (req, res) {                              // load the single view file (angular will handle the page routing on the front-end)
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log('App initialized');