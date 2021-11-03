const express = require("express");
const router = express.Router();
const {
  createPage,
  getPage,
  updatePage,
  deletePage,
  exportPage,
} = require("../controllers/pageController");
const elementRoutes = require("./elementRoutes");

const routes = () => {
  router.post("/", createPage);

  router.route("/:pageId").get(getPage).put(updatePage).delete(deletePage);

  router.get("/:pageId/export", exportPage);

  /*   router.use(
    "/:pageId",
    (req, res, next) => {
      req.pageId = req.params.pageId;
      next();
    },
    elementRoutes()
  ); */

  return router;
};

module.exports = routes;
