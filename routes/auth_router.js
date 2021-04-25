const express = require("express");
const router = express.Router();
const authController = require("../controllers/authorController");

router.get("/register", authController.getRegisterPage);

router.post("/register", authController.registerUser);

module.exports = router;
