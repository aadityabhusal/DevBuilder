const express = require("express");
const {
  createSite,
  getSite,
  updateSite,
  deleteSite,
  exportSite,
} = require("../controllers/siteController");

const router = express.Router();

const routes = () => {
  router.post("/", createSite);

  router.route("/:siteId").get(getSite).put(updateSite).delete(deleteSite);

  router.get("/:siteId/export", exportSite);

  return router;
};

module.exports = routes;
