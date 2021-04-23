var express = require("express");
var router = express.Router();

const sharp = require("sharp");
const jimp = require("jimp");
const fs = require("fs");
const arrayBufferToBuffer = require("arraybuffer-to-buffer");

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

const categories = [
  "Lifestyle",
  "Home Design",
  "Technology",
  "Food for Thought",
];

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
  res.render("addpost", { categories: categories });
});

router.post("/addpost", function (req, res, next) {
  console.log("inside addpost post method");
  const uploadFilePath = "../data/uploads/";
  // save post to db

  for (let i = 0; i < req.body.length; i++) {
    const elem = req.body[i];

    if ((elem.textType = "image")) {
      let arrbuffer = new Uint8Array(JSON.parse(elem.data)).buffer;
      let buffer = arrayBufferToBuffer(arrbuffer);

      sharp(buffer)
        .resize({ width: elem.width })
        .toFile(__dirname + "/../data/uploads/" + elem.fileName, (err) => {
          if (err) {
            console.log(err);
          }
        });
    } else {
      // elem is text node (h1, h2, h3, h4, p)
    }
  }

  res.redirect("/addpost");
});

module.exports = router;
