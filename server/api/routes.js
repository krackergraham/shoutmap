var express = require('express'),
    dataProvider = require('../db/provider');

var router = module.exports = express.Router();

// =============== BEGIN GET ===============

/* Get
 * '/api/shouts'
 * Returns all shouts from the database
 * */
router.route('/shouts')
    .get(function (req, res) {
        dataProvider.shouts(function (shouts) {
            res.send(shouts);
        });
    });

/* Get
 * '/api/replies/{id}'
 * Returns all replies for a shout from the database
 * */
router.route('/replies/:id')
    .get(function (req, res) {
        dataProvider.repliesForShout(req.params.id, function (replies) {
            res.send(replies);
        });
    });

// ================ END GET ================

// =============== BEGIN POST ==============

/* Post
 * '/api/shout'
 * Saves a new Shout object to the database*/
router.route('/shout')
    .post(function (req, res) {
        var shout = req.body;
        dataProvider.saveShout(shout.text, shout.location.long, shout.location.lat, function (success) {
            res.send(success);
        });
    });

/* Post
 * '/api/reply'
 * Saves a new Reply object to the database*/
router.route('/reply')
    .post(function (req, res) {
        var reply = req.body;
        dataProvider.saveReply(reply.text, reply.location.long, reply.location.lat, reply.parentId, function (success) {
            res.send(success);
        });
    });

// ================ END POST ================
