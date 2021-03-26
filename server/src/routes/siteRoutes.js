const express = require("express");
const router = express.Router();

const routes = () => {
  // Creating a new site
  router.post("/:userId", (req, res, next) => {
    try {
      res.send("Post Site Successful");
    } catch (error) {
      return next(error);
    }
  });

  // Getting and Deleting a site
  router
    .route("/:siteId")
    .get((req, res, next) => {
      try {
        res.send("Get Site Successful");
      } catch (error) {
        return next(error);
      }
    })
    .put((req, res, next) => {
      try {
        res.send("Put Site Successful");
      } catch (error) {
        return next(error);
      }
    })
    .delete((req, res, next) => {
      try {
        res.send("Delete Site Successful");
      } catch (error) {
        return next(error);
      }
    });

  return router;
};

module.exports = routes;
