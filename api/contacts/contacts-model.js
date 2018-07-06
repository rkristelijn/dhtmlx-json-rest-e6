const mongoose = require('mongoose');

const ContactsSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  photo: String,
  name: String,
  dob: String,
  pos: String,
  email: String,
  phone: String,
  company: String,
  info: String
});

const Contact = mongoose.model('Contact', ContactsSchema);

module.exports = Contact;
