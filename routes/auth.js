const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/auth/authentication");
const verifyToken = require("../middleware/verify");
const viewAccount = require("../controller/auth/viewAccount");
const getBalance = require("../controller/auth/getBalance");

router.post("/register", register);

router.post("/login", login);

router.get("/viewAccount", verifyToken, viewAccount);

router.get("/getBalance", verifyToken, getBalance);

module.exports = router;
