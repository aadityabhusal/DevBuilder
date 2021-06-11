const express = require("express");
const {
  createPage,
  getPage,
  updatePage,
  deletePage,
  exportPage,
} = require("../controllers/pageController");

const router = express.Router();

const routes = () => {
  router.post("/", createPage);
  router.route("/:pageId").get(getPage).put(updatePage).delete(deletePage);
  router.get("/:pageId/export", exportPage);
  return router;
};

module.exports = routes;
