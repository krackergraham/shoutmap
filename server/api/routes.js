var express = require('express'),
    Shout = require('../models/shout'),
    Reply = require('../models/reply');

var router = module.exports = express.Router();

// =============== BEGIN GET ===============

/* Get
 * '/shouts'
 * Returns all shouts from the database
 * */
router.route('/shouts')
    .get(function (req, res) {
        Shout.find(function (err, shouts) {
            res.send(shouts);
        });
    });

/* Get
 * '/replies/{id}'
 * Returns all replies for a shout from the database
 * */
router.route('/replies/:id')
    .get(function (req, res) {
        Reply.find({parentId: req.params.id}, function (err, replies) {
            res.send(replies);
        });
    });

// ================ END GET ================

// =============== BEGIN POST ==============

/* Post
 * '/shout'
 * Saves a new Shout object to the database*/
router.route('/shout')
    .post(function (req, res) {
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
router.route('/reply')
    .post(function (req, res) {
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

// ================ END POST ================
//
//router.route('/')
//    .get(function (req, res) {
//        res.sendFile(path.join(__dirname, '../public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
//    });