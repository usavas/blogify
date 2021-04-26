const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.addCategory);

module.exports = router;
