// @/models.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  isRecentWinner: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };