// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

// Dependency instantiation
console.log('App starting up...');
var app = express();
app.use(cors());
app.use(bodyParser());

console.log('Connecting to database');
mongoose.connect('mongodb://localhost/shoutmap');

// Model definition
var Shout = mongoose.model('Shout', {
    text: String,
    location: {
        lat: Number,
        long: Number
    },
    time: Date
});

var Reply = mongoose.model('Reply', {
    text: String,
    location: {
        lat: Number,
        long: Number
    },
    time: Date,
    parentId: String
});
/* Routing */

/* Get
 * '/all'
 * Returns all shouts from the database
 * */
app.get("/shouts", function (req, res) {
    Shout.find(function (err, shouts) {
        res.send(shouts);
    });
});

/* Get
 * '/replies'
 * Returns all replies from the database
 * */
app.get("/replies", function (req, res) {
    Reply.find(function (err, replies) {
        res.send(replies);
    });
});

/* Post
 * '/shout'
 * Saves a new Shout object to the database*/
app.post('/shout', function (req, res) {
    var obj = req.body;
    var shout = new Shout({
        text: obj.text,
        location: {
            lat: obj.location.lat,
            long: obj.location.long
        },
        time: obj.time
    });
    shout.save(function (err) {
        if (err) {
            console.log('Error saving shout to database - ' + err);
        }
        res.send();
    })
});

/* Post
 * '/reply'
 * Saves a new Reply object to the database*/
app.post('/reply', function (req, res) {
    var obj = req.body;
    var reply = new Reply({
        text: obj.text,
        location: {
            lat: obj.location.lat,
            long: obj.location.long
        },
        time: obj.time,
        parentId: obj.parentId
    });
    reply.save(function (err) {
        if (err) {
            console.log('Error saving reply to database - ' + err);
        }
        res.send();
    })
});

// Listen for any requests on port 3000
console.log('Listening on port 3000');
app.listen(3000);