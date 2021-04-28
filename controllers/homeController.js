const Post = require("../models/post");
const CategoryService = require("../services/categoryService");

async function getCategories() {
  const categories = await CategoryService.getCategories();
  return categories;
}

exports.post_list = async function (req, res, next) {
  const categories = await getCategories();

  let isLogin = false;
  if (req.session.authorId) {
    isLogin = true;
  }

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
      res.render("home", {
        isLogin: isLogin,
        posts: postExerpts,
        categories: categories,
      });
    });
};

exports.get_post = async function (req, res) {
  let post = await Post.findById(req.params.id);
  res.render("post", { post: post });
};
