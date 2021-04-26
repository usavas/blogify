const Author = require("../models/author");

module.exports.getRegisterPage = function (req, res) {
  res.render("auth/register");
};

module.exports.registerUser = function (req, res, next) {
  // create new author

  let author = new Author({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  Author.create(author, function (err) {
    console.log(err);
    next();
  });

  res.redirect("/");
};

module.exports.getLoginPage = async function (req, res) {
  res.render("auth/login");
};

module.exports.login = async function (req, res) {
  Author.find({
    email: req.body.email,
    password: req.body.password,
  }).exec(function (err, qRes) {
    if (err) {
      console.log(err);
    }
    if (qRes && qRes.length > 0) {
      res.redirect("/");
    }
    console.log("Login failed due to wrong credentials");
  });
};
