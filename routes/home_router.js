var express = require("express");
var router = express.Router();

posts = [
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

categories = ["Lifestyle", "Home Design", "Technology", "Food for Thought"];

router.get("/", function (req, res, next) {
  res.render("home", { posts: posts, categories: categories });
});

router.get("/post/:id", function (req, res, next) {
  let post = posts.filter((p) => p.id === parseInt(req.params.id))[0];
  res.render("post", { post: post });
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/privacy", function (req, res, next) {
  res.render("privacy");
});

router.get("/addpost", function (req, res, next) {
  res.render("addpost");
});

router.post("/addpost", function (req, res, next) {
  console.log("inside addpost post method");
  // get image data as well
  // save post to db

  // console.log(req.body[2].textType);
  // console.log(req.body[2].fileName);
  // console.log(req.body[2].width);

  // CAUSES TOO MUCH PROBLEM TOO LARGE DATA FOR IMAGE
  // console.log(req.body);

  res.redirect("/addpost");
});

module.exports = router;
