const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  vendor: String,
  category: String,
  description: String,
  isAnomaly: Boolean,
});

module.exports = mongoose.model("Expense", expenseSchema);