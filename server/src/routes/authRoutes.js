const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../controllers/authController");
const router = express.Router();

const routes = () => {
  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", logout);
  router.post("/refreshToken", refreshToken);

  return router;
};

module.exports = routes;
