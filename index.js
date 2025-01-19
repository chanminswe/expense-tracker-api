const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");
const DbConnection = require("./db/DbConnection");

const PORT = process.env.PORT || 4040;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Expense api started running");
  res.json({ message: "Your Expense Api is running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`${PORT} has started!`);
  DbConnection();
});
