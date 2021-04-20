const mongoose = require("mongoose");
const { performance } = require("perf_hooks");
let elementId = performance.now().toString(36).replace(/\./g, "");

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
        styles: {
          main: "",
        },
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
        children: {
          [elementId]: {
            _id: elementId,
            path: [],
            tagName: "div",
            classes: ["container"],
            text: "",
            attributes: {
              id: "page-container",
            },
            children: {},
          },
        },
        data: {},
      },
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
