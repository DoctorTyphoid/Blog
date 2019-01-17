const db = require("../db");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dateRegistered: Date
});

var User = mongoose.model("users", userSchema);
module.exports = mongoose.model("users", userSchema);

module.exports.findAll = function(callback) {
  User.find({}, callback);
};

module.exports.create = function(user, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      user.dateRegistered = new Date(Date.now()).toISOString();
      user.save(callback);
    });
  });
};

module.exports.verifyPassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, function(err, res) {
    if (err) callback(err);
    callback(null, res);
  });
};
