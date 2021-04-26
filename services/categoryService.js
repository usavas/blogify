const Category = require("../models/category");

module.exports.getCategories = async function () {
  const categories = await Category.find({});
  return categories;
};

module.exports.deleteCategoryById = async function (categoryId) {
  const result = await Category.deleteOne({ _id: categoryId });
  if (result >= 1) {
    return true;
  }
};
