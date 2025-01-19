const Incomes = require("../../models/incomes");

const addIncome = async (req, res) => {
  try {
    const { username, userId } = req.user;

    if (!username || !userId) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    const { amount, category, description } = req.body;

    if (!amount || !category || !description) {
      return res
        .status(400)
        .json({ message: "Cannot leave the required fields empty" });
    }

    const createTransaction = await Incomes.create({
      userId,
      amount,
      category,
      description,
    });

    if (!createTransaction) {
      return res.status(400).json({ message: "Unable to add money" });
    }
    res
      .status(200)
      .json({ message: "Added money sucessfully!", createTransaction });
  } catch (error) {
    console.error("Error occured at add Expense Controller ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addIncome;
