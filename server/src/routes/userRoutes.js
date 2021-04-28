const express = require("express");

const {
  createUser,
  loginUser,
  getUser,
  authenticateUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

const routes = () => {
  router.post("/signup", createUser);
  router.post("/login", loginUser);
  router.post("/auth", authenticateUser);

  router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

  return router;
};

module.exports = routes;
