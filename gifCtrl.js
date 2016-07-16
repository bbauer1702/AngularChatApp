var gifModel = require('./gifModel.js');

module.exports = {
  create: function(req, res) {
    var gif = new gifModel(req.body);
    gif.save(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  read: function(req, res) {
    gifModel
    .find(req.query)
    .exec(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },
  getOne: function(req, res) {
    gifModel
    .findById(req.params.id)
    .exec(function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
  },

  getMostRecent: function(req, res){
    gifModel
      .find({}).sort('-date')
      .limit(1)
      .exec(function(err, result){
        if(err) {
          return res.send(err);
        }
        res.send(result);
      });
    },

  update: function(req, res){
    gifModel
    .findByIdAndUpdate(req.params.id, req.body, function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  },

  delete: function(req, res){
    gifModel
    .remove(function(err, result){
      if (err) {
        res.send(err);
      }
      res.send(result);
    });
  }
};
