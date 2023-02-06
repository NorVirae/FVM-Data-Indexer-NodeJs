// @/models.js
const mongoose = require("mongoose");

const PodcastSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  metadataURI: {
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