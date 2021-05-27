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
    status: {
      type: Number,
      default: 0,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

SiteSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Site", SiteSchema);
