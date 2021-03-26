const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

const routes = () => {
  router.post("/", createUser);

  router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

  return router;
};

module.exports = routes;
