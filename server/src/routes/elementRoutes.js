const express = require("express");
const {
  createElement,
  getElement,
  updateElement,
  deleteElement,
} = require("../controllers/elementController");

const router = express.Router();

const routes = () => {
  router.post("/:parentId", createElement);

  router
    .route("/:elementId")
    .get(getElement)
    .put(updateElement)
    .delete(deleteElement);

  return router;
};

module.exports = routes;
