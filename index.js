const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");
const DbConnection = require("./db/DbConnection");
const cors = require("cors");

const PORT = process.env.PORT || 4040;

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log("Expense api started running");
  res.json({ message: "Your Expense Api is running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`${PORT} has started!`);
  DbConnection();
});
