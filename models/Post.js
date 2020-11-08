const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
  video_ETag: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  img_ETag: {
    type: String,
    required: true,
  },
  metadata: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
