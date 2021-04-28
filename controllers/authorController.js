const Author = require("../models/author");

module.exports.getRegisterPage = function (req, res) {
  res.render("auth/register");
};

module.exports.registerUser = async function (req, res, next) {
  let author = new Author({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  Author.create(author, function (err) {
    if (err) {
      next(err);
    }
    res.redirect("/auth/login");
  });
};

module.exports.getLoginPage = async function (req, res) {
  res.render("auth/login");
};

module.exports.login = async function (req, res) {
  Author.findOne({
    email: req.body.email,
    password: req.body.password,
  }).exec(function (err, author) {
    if (err) {
      console.log(err);
    }
    if (author) {
      console.log(author);
      req.session.authorId = author._id;
      res.redirect("/");
    } else {
      console.log("Login failed, check email and password");
      res.redirect("/auth/login");
    }
  });
};

module.exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
