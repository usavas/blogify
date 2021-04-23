const Post = require("../models/post");
const Category = require("../models/category.js");

const sharp = require("sharp");
const fs = require("fs");
const arrayBufferToBuffer = require("arraybuffer-to-buffer");

const categories = [
  "Lifestyle",
  "Home Design",
  "Technology",
  "Food for Thought",
];

exports.add_post = function (req, res, next) {
  res.render("addpost", { categories: categories });
};

exports.post_list = function (req, res, next) {
  Post.find()
    .sort([["date", "descending"]])
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      }
      res.render("home", { posts: posts, categories: categories });
    });
};

exports.get_post = function (req, res, next) {
  let post = Post.findById(req.params.id);
  res.render("post", { post: post });
};

exports.post_new_post = function (req, res, next) {
  console.log("inside addpost post method");
  const uploadFilePath = "../data/uploads/";
  // save post to db

  for (let i = 0; i < req.body.length; i++) {
    const elem = req.body[i];

    if (elem.textType === "image") {
      let arrbuffer = new Uint8Array(JSON.parse(elem.data)).buffer;
      let buffer = arrayBufferToBuffer(arrbuffer);

      sharp(buffer)
        .resize({ width: elem.width })
        .toFile(__dirname + "/../data/uploads/" + elem.fileName, (err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      console.log(elem.textType);
    }
  }

  res.redirect("/addpost");
};
