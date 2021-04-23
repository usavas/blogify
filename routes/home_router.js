var express = require("express");
var router = express.Router();
const PostController = require("../controllers/postController.js");

const posts = [
  {
    id: 1,
    title: "What a wonderful life",
    content: [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
    ],
    postRoute: "/post/1",
  },
  {
    id: 2,
    title: "Minimalism",
    content: [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
    ],
    postRoute: "/post/2",
  },
];

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
