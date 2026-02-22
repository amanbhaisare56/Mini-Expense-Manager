const mongoose = require("mongoose");

const vendorMapSchema = new mongoose.Schema({
  vendor: String,
  category: String,
});

module.exports = mongoose.model("VendorMap", vendorMapSchema);