var Shout = require('../models/shout'),
    Reply = require('../models/reply');

var provider = module.exports;

// ============= GET =============
provider.shouts = function (cb) {
    Shout.find(function (err, shouts) {
        if (err) {
            console.log('Error retrieving shouts from database - ' + err);
        }
        cb(shouts);
    });
};

provider.repliesForShout = function (shoutId, cb) {
    Reply.find({parentId: shoutId}, function (err, replies) {
        if (err) {
            console.log('Error retrieving replies for shout with id: ' + shoutId + ' - ' + err);
        }
        cb(replies);
    });
};

// ============= SAVE =============
provider.saveShout = function (text, long, lat, cb) {
    var shout = new Shout({
        text: text,
        coords: [long, lat]
    });
    shout.save(function (err) {
        if (err) {
            console.log('Error saving shout to database - ' + err);
        }
        cb(err == null);
    });
};

provider.saveReply = function (text, long, lat, parentId, cb) {
    var reply = new Reply({
        text: text,
        coords: [long, lat],
        parentId: parentId
    });
    reply.save(function (err) {
        if (err) {
            console.log('Error saving reply to database - ' + err);
        }
        cb(err == null)
    });
};