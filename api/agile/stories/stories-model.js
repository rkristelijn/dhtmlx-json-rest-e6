const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  createdBy: String,
  updatedBy: String,
  name: String,
  status: String,
  due: String,
  desc: String
});
Schema.pre('findOneAndUpdate', function(next) {
  this._update.updated = new Date();
  next();
});

let Model = mongoose.model('Stories', Schema);

module.exports = Model;
