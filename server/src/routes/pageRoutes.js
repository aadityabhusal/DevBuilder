const express = require("express");
const {
  createPage,
  getPage,
  updatePage,
  deletePage,
} = require("../controllers/pageController");

const elementRoutes = require("./elementRoutes");

const router = express.Router();

const routes = () => {
  router.post("/", createPage);

  router.route("/:pageId").get(getPage).put(updatePage).delete(deletePage);

  router.use(
    "/:pageId",
    (req, res, next) => {
      req.pageId = req.params.pageId;
      next();
    },
    elementRoutes()
  );

  return router;
};

module.exports = routes;
