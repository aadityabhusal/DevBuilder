const express = require("express");
const router = express.Router();
const {
  createPage,
  getPage,
  updatePage,
  deletePage,
  exportPage,
} = require("../controllers/pageController");
const { verifyAccessToken } = require("../helpers/jwt");
const elementRoutes = require("./elementRoutes");

const routes = () => {
  router.post("/", verifyAccessToken, createPage);

  router
    .route("/:pageId")
    .all(verifyAccessToken)
    .get(getPage)
    .put(updatePage)
    .delete(deletePage);

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
