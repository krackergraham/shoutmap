var mongoose = require('mongoose');

// Model definition
var shout = mongoose.model('Shout', {
    text: String,
    location: {
        lat: Number,
        long: Number
    },
    time: Date
});

module.exports = shout;
