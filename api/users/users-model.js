const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let Schema = new mongoose.Schema({
    /// systemFields
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: 'SADMIN'
    },
    updatedBy: {
        type: String,
        default: 'SADMIN'
    },
    /// userFields
    username: String,
    password: String,
    roles: String,
    endDate: String,
    info: String
});
Schema.methods.generateHash = function (password) {
    console.log('generateHash', password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
Schema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
Schema.pre('findOneAndUpdate', function (next) {
    if (this._update.password) {
        this._update.password = Schema.methods.generateHash(this._update.password);
    }
    this._update.updated = new Date();
    next();
});

let Model = mongoose.model('Users', Schema);

module.exports = Model;
