const express = require("express");

const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

const routes = () => {
  router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
  return router;
};

module.exports = routes;
