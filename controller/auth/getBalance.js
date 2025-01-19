const Expenses = require("../../models/expenses");
const Incomes = require("../../models/incomes");
const { ObjectId } = require("mongodb");

const getBalance = async (req, res) => {
  try {
    const { userId, username } = req.user;
    const id = new ObjectId(userId);

    if (!userId || !username) {
      return res.status(403).json({ message: "Token Expired or invalid" });
    }

    const incomeBalance = await Incomes.aggregate([
      { $match: { userId: id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseBalance = await Expenses.aggregate([
      { $match: { userId: id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const incomes = incomeBalance.length > 0 ? incomeBalance[0].total : 0;
    const expenses = expenseBalance.length > 0 ? expenseBalance[0].total : 0;

    const balance = incomes - expenses;

    return res.status(200).json({
      username,
      balance,
      incomeBalance,
      expenseBalance,
    });
  } catch (error) {
    console.error("Error occured while trying to get Balance ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getBalance;
