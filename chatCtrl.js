var chatModel = require('./chatModel.js');

module.exports = {
  create: function(req, res) {
    var chat = new chatModel(req.body);
    chat.save(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  read: function(req, res) {
    chatModel
    .find(req.query)
    .sort([['_id', -1]])
    .limit(50)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  getOne: function(req, res) {
    chatModel
    .findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },
  update: function(req, res){
    chatModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  delete: function(req, res){
    chatModel
    .remove(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  }
};
