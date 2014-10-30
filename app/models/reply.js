var mongoose = require('mongoose');

var reply = mongoose.model('Reply', {
    text: String,
    location: {
        lat: Number,
        long: Number
    },
    time: Date,
    parentId: String
});

module.exports = reply;
