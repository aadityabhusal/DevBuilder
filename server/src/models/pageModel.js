const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "Invalid Site Id",
    },
    name: {
      type: String,
      required: "Enter your page name",
    },
    head: {
      type: Object,
      default: {
        title: "",
        meta: {},
        styles: {},
        scripts: {},
        links: {},
      },
    },
    body: {
      type: Object,
      default: {
        _id: mongoose.Types.ObjectId(),
        id: "",
        tagName: "body",
        classes: [],
        path: [],
        children: {},
        data: {},
      },
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

module.exports = mongoose.model("Page", PageSchema);
