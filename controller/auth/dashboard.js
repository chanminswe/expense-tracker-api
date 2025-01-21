const Expenses = require("../../models/expenses");

const dashboard = async (req, res) => {
  try {
    const { userId, username } = req.user;

    if (!userId || !username) {
      return res.status(403).json({ message: "UnAuthorized Error" });
    }

    const findUserExpenses = await Expenses.find({ userId });

    if (!findUserExpenses || findUserExpenses.length === 0) {
      return res
        .status(400)
        .json({ message: "No expenses found for this user" });
    }

    const totalSpent = await Expenses.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const mostSpentCategory = await Expenses.aggregate([
      { $match: { userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 1 },
    ]);

    const recentTransactions = await Expenses.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      message: "Dashboard data retrieved successfully",
      totalSpent: totalSpent[0]?.total || 0,
      mostSpentCategory: mostSpentCategory[0]?._id || "N/A",
      recentTransactions,
    });
  } catch (error) {
    console.error("Error occurred at dashboard:", error.message);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

module.exports = dashboard;
