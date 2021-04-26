const Category = require("../models/category");

module.exports.addCategory = async function (req, res) {
  let category = new Category({
    category: req.body.category,
    description: req.body.description,
  });

  const catResult = await Category.create(category);
  if (catResult) {
    return catResult;
  }
};
