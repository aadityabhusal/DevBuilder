const express = require("express");
const {
  createSite,
  getSite,
  updateSite,
  deleteSite,
} = require("../controllers/siteController");

const router = express.Router();

const routes = () => {
  router.post("/:userId", createSite);

  router.route("/:siteId").get(getSite).put(updateSite).delete(deleteSite);

  return router;
};

module.exports = routes;
