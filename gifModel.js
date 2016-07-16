var mongoose = require('mongoose');

var gifModel = new mongoose.Schema({
    url: {type: String},
    query: {type: String},
    date: {type: String}
});

module.exports = mongoose.model('gif', gifModel);
