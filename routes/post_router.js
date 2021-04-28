const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");

router.get("/posts", PostController.posts);
router.get("/postinfo/:id", PostController.get_post_info);

router.get("/addpost", PostController.add_post);
router.get("/addpost/:id", PostController.add_post);
router.get("/deletepost/:id", PostController.delete_post);
router.post("/addpost", PostController.post_new_post);

module.exports = router;
