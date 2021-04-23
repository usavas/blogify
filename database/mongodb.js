const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1/blogify";
const Category = require("../models/category");

exports.init = function () {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("opened", function () {
    console.log("db opened");
  });
  db.once("connected", async function () {
    //     console.log("db connected");
    //     const res = await Category.deleteMany({});
    //     console.log(`deleted documents: ${res.deletedCount}`);
    //     Category.insertMany([
    //       {
    //         category: "LifeStyle",
    //         description: "It is about lifestyle",
    //       },
    //       {
    //         category: "Home Design",
    //         description: "It is about your home",
    //       },
    //       {
    //         category: "Technology",
    //         description: "If you are a nerd",
    //       },
    //       {
    //         category: "Food for Thought",
    //         description: "Stuff to contemplate on...",
    //       },
    //     ]);
  });
};
