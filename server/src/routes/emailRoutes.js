const express = require("express");
const { testEmail } = require("../controllers/emailController");
const router = express.Router();

const routes = () => {
  router.post("/test", testEmail);
  return router;
};

module.exports = routes;
