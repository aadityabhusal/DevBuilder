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
        style: {
          main: [],
        },
        script: {},
        link: {},
      },
    },
    body: {
      type: Object,
      default: {
        _id: mongoose.Types.ObjectId(),
        tagName: "body",
        path: [],
        attributes: {
          id: "",
          class: "",
        },
        children: {
          [elementId]: {
            _id: elementId,
            path: [],
            tagName: "div",
            text: [],
            attributes: {
              id: "page-container",
              class: "container",
            },
            children_order: [],
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

PageSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("Page", PageSchema);
