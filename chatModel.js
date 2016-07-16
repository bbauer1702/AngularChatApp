var mongoose = require('mongoose');

var chatModel = new mongoose.Schema({
    body: {type: String},
    date: {type: String},
    currentGifQuery: {type: String},
    currentGifUrl: {type: String}
});

module.exports = mongoose.model('Chats', chatModel);
