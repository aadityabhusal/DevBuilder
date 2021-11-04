const express = require("express");
const {
  createSite,
  getSite,
  updateSite,
  deleteSite,
  exportSite,
} = require("../controllers/siteController");
const { verifyAccessToken } = require("../helpers/jwt");

const router = express.Router();

const routes = () => {
  router.post("/", verifyAccessToken, createSite);

  router
    .route("/:siteId")
    .all(verifyAccessToken)
    .get(getSite)
    .put(updateSite)
    .delete(deleteSite);

  router.get("/:siteId/export", verifyAccessToken, exportSite);

  return router;
};

module.exports = routes;
