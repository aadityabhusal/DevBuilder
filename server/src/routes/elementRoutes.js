const express = require("express");
const {
  createElement,
  getElement,
  deleteElement,
} = require("../controllers/elementController");

const router = express.Router();

const routes = () => {
  router.post("/", createElement);

  router.route("/:elementId").get(getElement).delete(deleteElement);

  return router;
};

module.exports = routes;
