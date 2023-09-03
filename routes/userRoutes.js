const express = require("express");
const controller = require("../controllers/userController");
const validateToken = require("../middlewares/tokenValidationHandler");
const router = express.Router();

router.post("/register", controller.registerUser);

router.post("/login", controller.loginUser);

router.post("/current", validateToken, controller.currentUser);

module.exports = router;
