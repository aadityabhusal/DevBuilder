const express = require("express");
const { verifyAccessToken } = require("../helpers/jwt");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const siteRoutes = require("./siteRoutes");
const pageRoutes = require("./pageRoutes");

const router = express.Router();

const routes = () => {
  // router.get("/", verifyAccessToken, (req, res) => {
  //   res.send({ message: req.payload });
  // });
  router.use("/auth", authRoutes());
  router.use("/user", userRoutes());
  router.use("/site", siteRoutes());
  router.use("/page", pageRoutes());
  return router;
};

module.exports = routes;
