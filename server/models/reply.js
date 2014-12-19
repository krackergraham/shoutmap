var mongoose = require('mongoose');

var reply = mongoose.model('Reply', {
    text: String,
    coords: {type: [Number], index: '2dsphere'},
    created: {type: Date, default: Date.now},
    parentId: String
});

module.exports = reply;
