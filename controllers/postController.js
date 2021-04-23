const Post = require("../models/post");
const Category = requrie("../models/category.js");

exports.post_list = function (req, res, next) {
  Post.find()
    .sort(["date", "descending"])
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      }
      res.render("home", { posts: posts });
    });
};
