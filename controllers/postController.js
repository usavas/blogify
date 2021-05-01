const Post = require("../models/post");
const CategoryService = require("../services/categoryService");

const sharp = require("sharp");
const arrayBufferToBuffer = require("arraybuffer-to-buffer");

async function getCategories() {
  const categories = await CategoryService.getCategories();
  return categories;
}

exports.add_post = async function (req, res) {
  if (!req.session.authorId) {
    res.redirect("/auth/login");
  } else {
    const categories = await getCategories();
    const authorId = req.session.authorId;

    if (req.params.id) {
      res.render("addpost", {
        postId: req.params.id,
        isLogin: true,
        authorId: authorId,
        categories: categories,
      });
    } else {
      res.render("addpost", {
        categories: categories,
        authorId: authorId,
        isLogin: true,
      });
    }
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
  if (!req.session.authorId) {
    res.redirect("/auth/login");
  } else {
    const posts = await Post.find({ author: req.session.authorId })
      .sort([["date", "descending"]])
      .populate("author")
      .populate("category");
    res.render("posts", { posts: posts });
  }
};

exports.get_post_info = async function (req, res) {
  const postId = req.params.id;
  const post = await Post.findOne({ _id: postId });
  res.status(200).send(post);
};

exports.post_new_post = async function (req, res) {
  const post = req.body;

  if (post._id) {
    const p = await updatePost(post);
    const pModel = new Post({
      _id: p._id,
      title: p.title,
      author: p.author,
      category: p.category,
      body: p.body,
    });
    pModel.isNew = false;
    const pSaved = await pModel.save();
    res.redirect(`/post/${pSaved._id}`);
  } else {
    const postAdd = await createNewPost(post);
    const postCreated = await Post.create(postAdd);
    res.redirect(`/post/${postCreated._id}`);
  }
};

async function updatePost(post) {
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
        });

      postBody.push({
        textType: elem.textType,
        content: elem.content,
        width: elem.width,
      });
    } else {
      postBody.push({
        textType: elem.textType,
        content: elem.content,
      });
    }
  }

  let postTitle = post.title;
  let categoryId = post.categoryId;
  let authorId = post.authorId;

  const postAdd = new Post({
    _id: post._id,
    title: postTitle,
    author: authorId,
    category: categoryId,
    body: postBody,
  });

  return postAdd;
}

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
        });

      postBody.push({
        textType: elem.textType,
        content: elem.content,
        width: elem.width,
      });
    } else {
      postBody.push({
        textType: elem.textType,
        content: elem.content,
      });
    }
  }

  let postTitle = post.title;
  let categoryId = post.categoryId;
  let authorId = post.authorId;

  const postAdd = new Post({
    title: postTitle,
    author: authorId,
    category: categoryId,
    body: postBody,
  });

  return postAdd;
}
