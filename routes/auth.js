const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/auth/authentication");
const verifyToken = require("../middleware/verify");
const viewAccount = require("../controller/auth/viewAccount");
const getBalance = require("../controller/auth/getBalance");
const dashboard = require("../controller/auth/dashBoard");
const profile = require("../controller/auth/profile");

router.post("/register", register);

router.post("/login", login);

router.get("/viewAccount", verifyToken, viewAccount);

router.get("/getBalance", verifyToken, getBalance);

router.get("/dashboard", verifyToken, dashboard);

router.get("/profile", verifyToken, profile);

module.exports = router;
