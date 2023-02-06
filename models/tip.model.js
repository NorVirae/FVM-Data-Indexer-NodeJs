// @/models.js
const mongoose = require("mongoose");

const TipSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  }
 
});

const Tip = mongoose.model("Tip", TipSchema);

module.exports = { Tip };