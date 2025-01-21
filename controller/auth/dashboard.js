const mongoose = require("mongoose");
const Expenses = require("../../models/expenses");
const Incomes = require("../../models/incomes");
const Users = require("../../models/users");

const dashboard = async (req, res) => {
  try {
    const { userId, username } = req.user;

    if (!userId || !username) {
      return res.status(403).json({ message: "Unauthorized Error" });
    }

    const findUser = await Users.findOne({ _id: id });

    if (!findUser) {
      return res.status(400).json({ message: "Cannot find user Id" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const findUserExpenses = await Expenses.find({ userId: userObjectId });

    if (!findUserExpenses || findUserExpenses.length === 0) {
      return res
        .status(400)
        .json({ message: "No expenses found for this user" });
    }

    const totalSpent = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const mostSpentCategory = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ]);

    const mostSpentItem = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$description", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ]);

    const recentTransactions = await Expenses.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5);

    const incomeBalance = await Incomes.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseBalance = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const categoryBreakdown = await Expenses.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const incomes = incomeBalance.length > 0 ? incomeBalance[0].total : 0;
    const expenses = expenseBalance.length > 0 ? expenseBalance[0].total : 0;

    const balance = incomes - expenses;

    findUser.balance = balance;
    await findUser.save();

    res.status(200).json({
      message: "Dashboard data retrieved successfully",
      totalSpent: totalSpent[0]?.total || 0,
      mostSpentCategory: mostSpentCategory[0]?._id || "N/A",
      mostSpentItem: mostSpentItem[0]?._id || "N/A",
      recentTransactions,
      balance,
      categoryBreakdown,
    });
  } catch (error) {
    console.error("Error occurred at dashboard:", error.message);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = dashboard;
