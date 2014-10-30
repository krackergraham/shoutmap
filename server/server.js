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
logger.log('Connecting to database...');
var dbUrl = process.env.NODE_ENV === "production" ? process.env.MONGOHQ_URL : 'mongodb://localhost/shoutmap';
mongoose.connect(dbUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback() {
    logger.success('Connected to MongoDB: ' + db.name);
});

// Create the server from the app and listen to the given port
http.createServer(app).listen(app.get('port'), function () {
    logger.log('Express server listening on port ' + app.get('port'));
});