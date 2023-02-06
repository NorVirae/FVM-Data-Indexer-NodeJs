// @/models.js
const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  adrr: {
    type: String,
    required: true,
  },
  bid: {
    type: Number,
    required: true,
  },
 
});

const Bid = mongoose.model("Bid", BidSchema);

module.exports = { Bid };