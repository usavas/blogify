const express = require("express");
const router = express.Router();
const authController = require("../controllers/authorController");

router.get("/register", authController.getRegisterPage);

router.post("/register", authController.registerUser);

router.get("/login", authController.getLoginPage);

router.post("/login", authController.login);

module.exports = router;
