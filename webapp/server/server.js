const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Customer = require("./models/Customer");
const Transaction = require("./models/Transaction");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crm-ledger")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API running");
});

// Customer routes
app.post("/add-customer", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.send(customer);
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// Transaction routes
app.post("/add-transaction", async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.send(transaction);
});

app.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find().populate("customerId");
  res.send(transactions);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});