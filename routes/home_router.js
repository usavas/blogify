var express = require("express");
var router = express.Router();

posts = [
  {
    title: "What a wonderful life",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
  },
  {
    title: "Minimalism",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
  },
];

categories = ["Lifestyle", "Home Design", "Technology", "Food for Thought"];

router.get("/", function (req, res, next) {
  res.render("home", { posts: posts, categories: categories });
});

module.exports = router;
