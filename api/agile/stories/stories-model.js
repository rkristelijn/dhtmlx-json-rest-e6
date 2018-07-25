const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: String,
  status: String,
  due: String,
  desc: String
});

const Model = mongoose.model('Stories', Schema);

module.exports = Model;
