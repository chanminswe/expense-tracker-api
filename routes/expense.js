const express = require("express");
const verifyToken = require("../middleware/verify");
const addExpense = require("../controller/expense/addExpense");
const router = express.Router();

router.post("/costs", verifyToken, addExpense);

module.exports = router;
