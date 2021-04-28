const Category = require("../models/category");

module.exports.addCategory = async function (req, res) {
  const categoryBody = req.body;

  if (categoryBody._id) {
    // update and redirect to categories main
    let category = new Category({
      _id: categoryBody._id,
      category: categoryBody.category,
      description: categoryBody.description,
    });
    category.isNew = false;
    await category.save();
    res.redirect("/categories");
  } else {
    let category = new Category({
      category: categoryBody.category,
      description: categoryBody.description,
    });

    await Category.create(category);
    res.redirect("/categories");
  }
};

module.exports.getCategories = async function (req, res, next) {
  if (!req.session.authorId) {
    res.redirect("/auth/login");
  } else {
    Category.find({}).exec((err, qRes) => {
      if (err) {
        next(err);
      }
      res.render("categories", { categories: qRes });
    });
  }
};

module.exports.deleteCategory = async function (req, res) {
  Category.deleteOne({ _id: req.params.id }).exec((err, qRes) => {
    if (err) {
      return err;
    }
    res.send(qRes);
  });
};
