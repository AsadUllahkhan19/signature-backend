const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    plotNumber: { type: String, required: true, unique: true },
    societyName: { type: String, default: "Pak View City" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
