// @/models.js
const mongoose = require("mongoose");

const PodcastSchema = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true,
  },
  nftCreator: {
    type: String,
    required: true,
  },
  ipfsUri: {
    type: String,
    required: true,
  },
  created: {
    type: Number,
    required: true,
  },
});

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = { Podcast };
