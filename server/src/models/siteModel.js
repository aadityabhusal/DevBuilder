const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema(
  {
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
      type: Object,
      default: {},
    },
    scripts: {
      type: Object,
      default: {},
    },
    configuration: {
      type: Object,
      default: {},
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("Site", SiteSchema);
