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
  num: {
    type: Number,
    default: 0
  },
  createdBy: String,
  updatedBy: String,
  name: String,
  status: String,
  due: String,
  desc: String
});
Schema.pre('save', function (next) {
  console.log('prehook')
  // console.log('prePreSave', this.updated, this.num);
  // this.updated = new Date();
  // this.num = this.num + 1;
  // console.log('PreSave', this.updated, this.num);
  next();
});

let Model = mongoose.model('Stories', Schema);

module.exports = Model;
