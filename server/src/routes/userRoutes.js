const express = require("express");

const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyAccessToken } = require("../helpers/jwt");

const router = express.Router();

const routes = () => {
  router
    .route("/:userId")
    .all(verifyAccessToken)
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
  return router;
};

module.exports = routes;
