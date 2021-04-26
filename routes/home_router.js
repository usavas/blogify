var express = require("express");
var router = express.Router();
const PostController = require("../controllers/postController.js");

router.get("/", PostController.post_list);
router.get("/posts", PostController.posts);
router.get("/post/:id", PostController.get_post);
router.get("/postinfo/:id", PostController.get_post_info);
router.get("/addpost", PostController.add_post);
router.get("/addpost/:id", PostController.add_post);
router.get("/deletepost/:id", PostController.delete_post);
router.post("/addpost", PostController.post_new_post);

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/privacy", function (req, res) {
  res.render("privacy");
});

module.exports = router;
