// @/models.js
const mongoose = require("mongoose");

const PodSaleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  auctionId: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  isOnSale: {
    type: Number,
    required: true,
  },

  startTime: {
    type: Number,
    required: true,
  },
 
});

const PodSale = mongoose.model("PodSale", PodSaleSchema);

module.exports = { PodSale };