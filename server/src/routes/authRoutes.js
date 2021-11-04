const express = require("express");
const {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

const routes = () => {
  router.post("/register", register);
  router.post("/login", login);
  router.post("/logout", logout);
  router.post("/refreshToken", refreshToken);
  router.put("/verify-email", verifyEmail);
  router.post("/forgot-password", forgotPassword);
  router.post("/reset-password", resetPassword);

  return router;
};

module.exports = routes;
