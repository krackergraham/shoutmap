var mongoose = require('mongoose');

// Model definition
var shout = mongoose.model('Shout', {
    text: String,
    coords: {type: [Number], index: '2dsphere'},
    created: {type: Date, default: Date.now}
});

module.exports = shout;
