const Expenses = require("../../models/expenses");

const getExpense = async (req, res) => {
  try {
    const { username, userId } = req.user;

    if (!username || !userId) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    const getExpenses = await Expenses.find({ userId });

    if (!getExpenses) {
      return res.status(400).json({ message: "Cannot find User" });
    }

    return res
      .status(200)
      .json({ message: "Your Total Expenses ", getExpenses });
  } catch (error) {
    console.error("Error Occured at get expense controller ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getExpense;
