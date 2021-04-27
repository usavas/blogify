const Post = require("../models/post");
const CategoryService = require("../services/categoryService");
const Author = require("../models/author");

const sharp = require("sharp");
const arrayBufferToBuffer = require("arraybuffer-to-buffer");

async function getCategories() {
  const categories = await CategoryService.getCategories();
  return categories;
}

exports.add_post = async function (req, res) {
  const categories = await getCategories();

  if (req.params.id) {
    res.render("addpost", { postId: req.params.id, categories: categories });
  } else {
    res.render("addpost", { categories: categories });
  }
};

exports.delete_post = async function (req, res, next) {
  Post.deleteOne({ _id: req.params.id }).exec((err) => {
    if (err) {
      console.log(err);
      next();
    }
    res.redirect("/posts");
  });
};

exports.posts = async function (req, res) {
  const posts = await Post.find()
    .sort([["date", "descending"]])
    .populate("author")
    .populate("category");
  res.render("posts", { posts: posts });
};

exports.post_list = async function (req, res, next) {
  const categories = await getCategories();

  Post.find()
    .sort([["date", "descending"]])
    .exec(function (err, posts) {
      if (err) {
        return next(err);
      }

      let excerpt = "No text content";
      let postExerpts = posts.map(function (p) {
        let pNodes = p.body.filter((b) => b.textType === "p");
        if (pNodes.length > 0) {
          let paragraph = pNodes[0].content;
          if (paragraph.length >= 360) {
            excerpt = paragraph.substring(0, 360) + "...";
          } else {
            excerpt = paragraph;
          }
        }

        return {
          postId: p._id,
          title: p.title,
          postRoute: p.postRoute,
          excerpt: excerpt,
          date: p.date,
        };
      });
      res.render("home", { posts: postExerpts, categories: categories });
    });
};

exports.get_post = async function (req, res) {
  console.log(req.params);
  let post = await Post.findById(req.params.id);
  console.log(post);
  res.render("post", { post: post });
};

exports.get_post_info = async function (req, res) {
  const postId = req.params.id;
  const post = await Post.findOne({ _id: postId });
  res.send(post);
};

exports.post_new_post = async function (req, res) {
  const post = req.body;
  console.log(post._id);

  if (post._id) {
    console.log("ID EXISTS: " + post._id);
  } else {
    const postAdd = await createNewPost(post);
    const postCreated = await Post.create(postAdd);
    res.redirect(`/post/${postCreated._id}`);
  }
};

async function createNewPost(post) {
  let postBody = [];

  for (let i = 0; i < post.body.length; i++) {
    const elem = post.body[i];

    if (elem.textType === "image") {
      let arrbuffer = new Uint8Array(JSON.parse(elem.data)).buffer;
      let buffer = arrayBufferToBuffer(arrbuffer);

      sharp(buffer)
        .resize({ width: elem.width })
        .withMetadata()
        .toFile(__dirname + "/../data/uploads/" + elem.content, (err) => {
          if (err) {
            console.log(err);
          }
          console.log(`image saved: ${elem.content}`);
        });

      postBody.push({
        textType: elem.textType,
        content: elem.content,
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

  let postTitle = post.title;
  let categoryId = post.categoryId;
  let author = await Author.findOne({});
  let authorId = author._id;

  const postAdd = new Post({
    title: postTitle,
    author: authorId,
    category: categoryId,
    body: postBody,
  });

  return postAdd;
}
