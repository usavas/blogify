var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/homeController.js");

router.get("/", HomeController.post_list);
router.get("/posts/:categoryId", HomeController.post_list);
router.get("/post/:id", HomeController.get_post);

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/privacy", function (req, res) {
  res.render("privacy");
});

module.exports = router;
