const Expenses = require("../../models/expenses");

const purchaseHistory = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(403)
        .json({ message: "Invalid Token or Expired Token!" });
    }

    const findHistory = await Expenses.find({ userId });

    if (!findHistory) {
      return res.status(400).json({ message: "Cannot find User" });
    }

    return res
      .status(200)
      .json({ message: "Transactions Available ", findHistory });
  } catch (error) {
    console.error("Error Occured at purchase history ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = purchaseHistory;
