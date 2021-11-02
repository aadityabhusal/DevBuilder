const express = require("express");
const { verifyAccessToken } = require("../helpers/jwt");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const siteRoutes = require("./siteRoutes");
const pageRoutes = require("./pageRoutes");

const router = express.Router();

const routes = () => {
  router.use("/auth", authRoutes());
  router.use("/user", verifyAccessToken, userRoutes());
  router.use("/site", verifyAccessToken, siteRoutes());
  router.use("/page", verifyAccessToken, pageRoutes());
  return router;
};

module.exports = routes;
