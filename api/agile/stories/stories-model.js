const mongoose = require('mongoose');

let schema = new mongoose.Schema({
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
// schema.pre('save', function (next) {
//   console.log('prePreSave', this.updated, this.num);
//   this.updated = new Date();
//   this.num = this.num + 1;
//   console.log('PreSave', this.updated, this.num);

//   next();
// });
// schema.post('save', function(doc) {
//   console.log('post');
// })
let Model = mongoose.model('Stories', schema);

module.exports = Model;
