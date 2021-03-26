const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Enter your first name",
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
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Site", SiteSchema);
