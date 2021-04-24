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
      let postExerpts = posts.map(function (p) {
        let paragraph = p.body.filter((b) => b.textType === "p")[0].content;
        if (paragraph.length >= 360) {
          paragraph = paragraph.substring(0, 360) + "...";
        }
        return {
          postId: p._id,
          title: p.title,
          postRoute: p.postRoute,
          excerpt: paragraph,
          date: p.date,
        };
      });
      res.render("home", { posts: postExerpts, categories: categories });
    });
};

exports.get_post = async function (req, res, next) {
  let post = await Post.findById(req.params.id);
  res.render("post", { post: post });
};

exports.post_new_post = async function (req, res, next) {
  console.log("inside addpost post method");
  const uploadFilePath = "../data/uploads/";
  // save post to db
  let postBody = [];

  console.log("body: ");
  console.log(req.body);

  for (let i = 0; i < req.body.elems.length; i++) {
    const elem = req.body.elems[i];

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

      postBody.push({
        textType: elem.textType,
        fileName: elem.fileName,
        width: elem.width,
      });
    } else {
      console.log(elem.textType);
      postBody.push({
        textType: elem.textType,
        content: elem.content,
      });
    }
  }

  let postTitle = req.body.title;
  let categoryId = req.body.categoryId;
  let author = await Author.findOne({});
  let authorId = author._id;

  console.log(`post title: ${postTitle}`);
  console.log(`post author id: ${authorId}`);

  const postCreated = await Post.create({
    title: postTitle,
    author: authorId,
    category: categoryId,
    body: postBody,
  });

  res.redirect(`/post/${postCreated._id}`);
};
