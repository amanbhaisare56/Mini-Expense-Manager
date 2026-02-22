const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const Expense = require("./models/Expense");
const VendorMap = require("./models/VendorMap");

const app = express(); // IMPORTANT

app.use(cors());
app.use(express.json());

// 🔹 MongoDB connection
mongoose
  .connect("mongodb+srv://aman:aman12356@expensetracker.yccpzbg.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  const upload = multer({ dest: "uploads/" });

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Add Expense API
app.post("/expenses", async (req, res) => {
  try {
    const { date, amount, vendor, description } = req.body;

    // find category
    const mapping = await VendorMap.findOne({ vendor });
    const category = mapping ? mapping.category : "Other";

    // find average for anomaly
    const avgResult = await Expense.aggregate([
      { $match: { category } },
      { $group: { _id: null, avgAmount: { $avg: "$amount" } } },
    ]);

    const avg = avgResult[0]?.avgAmount || 0;
    const isAnomaly = amount > 3 * avg;

    const expense = new Expense({
      date,
      amount,
      vendor,
      category,
      description,
      isAnomaly,
    });

    await expense.save();

    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/test", (req, res) => {
  res.send("Test working");
});

app.post("/upload-csv", upload.single("file"), async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (let row of results) {
        const { date, amount, vendor, description } = row;

        const mapping = await VendorMap.findOne({ vendor });
        const category = mapping ? mapping.category : "Other";

        const avgResult = await Expense.aggregate([
          { $match: { category } },
          { $group: { _id: null, avgAmount: { $avg: "$amount" } } },
        ]);

        const avg = avgResult[0]?.avgAmount || 0;
        const isAnomaly = amount > 3 * avg;

        await Expense.create({
          date,
          amount,
          vendor,
          category,
          description,
          isAnomaly,
        });
      }

      res.json({ message: "CSV uploaded successfully" });
    });
});

app.get("/dashboard", async (req, res) => {
  try {
    // Monthly totals per category
    const monthlyTotals = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setDate(1)),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Top 5 vendors
    const topVendors = await Expense.aggregate([
      {
        $group: {
          _id: "$vendor",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);

    // Anomalies
    const anomalies = await Expense.find({ isAnomaly: true });

    res.json({
      monthlyTotals,
      topVendors,
      anomalies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard error" });
  }
});