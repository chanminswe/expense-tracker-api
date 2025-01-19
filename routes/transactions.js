const express = require("express");
const verifyToken = require("../middleware/verify");
const addExpense = require("../controller/expense/addExpense");
const addIncome = require("../controller/incomes/addIncome");
const router = express.Router();

router.post("/costs", verifyToken, addExpense);

router.post("/incomes", verifyToken, addIncome);

module.exports = router;
