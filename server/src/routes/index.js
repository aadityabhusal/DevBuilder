const express = require("express");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const siteRoutes = require("./siteRoutes");
const pageRoutes = require("./pageRoutes");

const router = express.Router();

const routes = () => {
  router.use("/auth", authRoutes());
  router.use("/user", userRoutes());
  router.use("/site", siteRoutes());
  router.use("/page", pageRoutes());
  return router;
};

module.exports = routes;
