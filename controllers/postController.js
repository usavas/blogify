const Post = require("../models/post");
const Category = require("../models/category.js");
const Author = require("../models/author");

const sharp = require("sharp");
const fs = require("fs");
const arrayBufferToBuffer = require("arraybuffer-to-buffer");

// const categories = [
//   "Lifestyle",
//   "Home Design",
//   "Technology",
//   "Food for Thought",
// ];

async function getCategories() {
  const categories = await Category.find({}).exec();
  return categories;
}

exports.add_post = async function (req, res, next) {
  const categories = await getCategories();
  res.render("addpost", { categories: categories });
};

exports.post_list = async function (req, res, next) {
  const categories = await getCategories();

  Post.find()
    .sort([["date", "descending"]])
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      }
      console.log(posts[0].postRoute);
      res.render("home", { posts: posts, categories: categories });
    });
};

exports.get_post = async function (req, res, next) {
  console.log(req.params);
  let post = await Post.findById(req.params.id);
  console.log(post.body);
  res.render("post", { post: post });
};

exports.post_new_post = async function (req, res, next) {
  console.log("inside addpost post method");
  const uploadFilePath = "../data/uploads/";
  // save post to db

  let categories = getCategories();

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

  res.redirect("/");
};
