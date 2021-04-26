const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/blogify";
const Category = require("../models/category");
const Author = require("../models/author");
const Post = require("../models/post");

exports.init = async function () {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("opened", function () {
    console.log("db opened");
  });

  createInitialData(db);
};

async function postsExist() {
  const len = await Post.countDocuments({});
  if (len > 0) {
    return true;
  }
  return false;
}

function createInitialData(db) {
  db.once("connected", async function () {
    const postsInitialized = await postsExist();
    if (postsInitialized) {
      return;
    }

    await Category.deleteMany({});
    await Category.insertMany([
      {
        category: "LifeStyle",
        description: "It is about lifestyle",
      },
      {
        category: "Home Design",
        description: "It is about your home",
      },
      {
        category: "Technology",
        description: "If you are a nerd",
      },
      {
        category: "Food for Thought",
        description: "Stuff to contemplate on...",
      },
    ]);

    await Author.deleteMany({});
    await Author.create({
      name: "Jane Herakles",
      email: "savas@blogify.com",
      passwd: "1234",
    });

    const author = await Author.findOne({});
    await Post.insertMany([
      new Post({
        title: "What a wonderful life",
        body: [
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
          },
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
          },
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
          },
        ],
        author: author._id,
      }),
      new Post({
        title: "Minimalism",
        body: [
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
          },
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
          },
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit",
          },
          {
            textType: "p",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos accusamus consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto! consequatur repudiandae exercitationem tempore magni nesciunt cupiditate sit voluptatum consequuntur alias voluptatibus, nobis, vitae, repellat nihil rem sed fugiat iusto!",
          },
        ],
        author: author._id,
      }),
    ]);
  });
}
