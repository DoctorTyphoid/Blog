const db = require("../db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogPost = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  datePosted: Date
});

module.exports = mongoose.model("posts", blogPost);
var Post = (module.exports = mongoose.model("posts", blogPost));
module.exports.findAll = function(callback) {
  Post.find({}, (err, posts) => {
    callback(err, posts);
  });
};
module.exports.create = function(post, callback) {
  post.datePosted = new Date(Date.now()).toISOString();

  post.save(callback);
};
