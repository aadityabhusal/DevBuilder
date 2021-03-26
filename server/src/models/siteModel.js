const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Invalid User Id",
  },
  name: {
    type: String,
    required: "Enter your site name",
  },
  pages: {
    type: Array,
    default: [],
  },
  styles: {
    type: Array,
    default: [],
  },
  scripts: {
    type: Array,
    default: [],
  },
  configuration: {
    type: Object,
    default: {},
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Site", SiteSchema);
