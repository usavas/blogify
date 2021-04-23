var express = require("express");
var router = express.Router();
const PostController = require("../controllers/postController.js");

router.get("/", PostController.post_list);
router.get("/post/:id", PostController.get_post);
router.get("/addpost", PostController.add_post);
router.post("/addpost", PostController.post_new_post);

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/privacy", function (req, res, next) {
  res.render("privacy");
});

module.exports = router;
