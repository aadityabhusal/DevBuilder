const express = require("express");
const router = express.Router();

const routes = () => {
  // Creating a new user
  router.post("/", (req, res, next) => {
    try {
      res.send("Post User Successful");
    } catch (error) {
      return next(error);
    }
  });

  // Getting and Deleting a user
  router
    .route("/:userId")
    .get((req, res, next) => {
      try {
        res.send("Get User Successful");
      } catch (error) {
        return next(error);
      }
    })
    .put((req, res, next) => {
      try {
        res.send("Put User Successful");
      } catch (error) {
        return next(error);
      }
    })
    .delete((req, res, next) => {
      try {
        res.send("Delete User Successful");
      } catch (error) {
        return next(error);
      }
    });

  return router;
};

module.exports = routes;
