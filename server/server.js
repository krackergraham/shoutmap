// Dependencies
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    logger = require('./logger'),
    path = require('path'),
    routes = require('./routes.js');

// Dependency instantiation
console.log('App starting up...');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser());
app.use(logger.request);

app.use(express.static(path.join(__dirname, './public/')));

routes.initialize(app);

// Connect to the backing database
console.log('Connecting to database...');
mongoose.connect('mongodb://localhost/shoutmap');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    console.log('Connected to MongoDB: ' + db.name);
});

// Create the server from the app and listen to the given port
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});