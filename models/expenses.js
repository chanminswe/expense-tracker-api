const { mongoose, Mongoose } = require("mongoose");

const ExpensesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expenses = mongoose.model("Expenses", ExpensesSchema);
module.exports = Expenses;
