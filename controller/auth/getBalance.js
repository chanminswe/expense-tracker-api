const { ObjectId } = require("mongodb"); // Import ObjectId
const Users = require("../../models/users"); // Import Users model
const Incomes = require("../../models/incomes");
const Expenses = require("../../models/expenses");

const getBalance = async (req, res) => {
  try {
    const { userId, username } = req.user;

    if (!userId || !username) {
      return res.status(403).json({ message: "Token Expired or invalid" });
    }

    const id = new ObjectId(userId); 

    const findUser = await Users.findOne({ _id: id });

    if (!findUser) {
      return res.status(400).json({ message: "Cannot find user Id" });
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

    findUser.balance = balance;
    await findUser.save();

    return res.status(200).json({
      username,
      balance,
      incomeBalance,
      expenseBalance,
    });
  } catch (error) {
    console.error("Error occurred while trying to get Balance ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getBalance;
