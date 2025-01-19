const Expenses = require("../../models/expenses");

const addExpense = async (req, res) => {
  const { username, userId } = req.user;

  if (!username || !userId) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }

  const { amount, category, description } = req.body;

  if (!amount || !category || reason) {
    return res
      .status(400)
      .json({ message: "Cannot leave the required fields empty" });
  }

  const createTransaction = await Expenses.create({
    userId,
    amount,
    category,
    description,
  });

  if (!createTransaction) {
    return res.status(400).json({ message: "Unable to add Expense" });
  }

  console.log(req.user, "And", req.body);
  res.status(200).json({ message: "Added expense sucessfully!" });
};

module.exports = addExpense;
