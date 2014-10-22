// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

// Dependency instantiation
console.log('App starting up...')
var app = express();
app.use(cors());
app.use(bodyParser());

console.log('Connecting to database')
mongoose.connect('mongodb://localhost/shoutmap')

// Model definition
var Shout = mongoose.model('Shout', {
	text: String,
	location: {
		lat: String,
		long: String
	},
	parentId: String
});

// Routing
app.get("/all", function (req, res) {
	Shout.find(function (err, shouts) {
		res.send(shouts);
	});
});

app.post('/shout', function (req, res) {
	var post = req.body;
	var shout = new Shout({
		text: post.text
	});
	shout.save(function (err) {
		if (err) {
			console.log('Error saving shout to database - ' + err);
		}
		res.send();
	})

})

// Listen for any requests on port 3000
console.log('Listening on port 3000')
app.listen(3000);