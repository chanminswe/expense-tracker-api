const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/auth/authentication");
const verifyToken = require("../middleware/verify");
const viewAccount = require("../controller/auth/viewAccount");

router.post("/register", register);

router.post("/login", login);

router.get("/viewAccount", verifyToken, viewAccount);

module.exports = router;
