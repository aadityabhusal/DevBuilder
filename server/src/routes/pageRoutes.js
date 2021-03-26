const express = require("express");

const elementRoutes = require("./elementRoutes");

const router = express.Router();

const routes = () => {
  // Creating a new page
  router.post("/:siteId", (req, res, next) => {
    try {
      res.send("Post Page Successful");
    } catch (error) {
      return next(error);
    }
  });

  // Getting and Deleting a page
  router
    .route("/:pageId")
    .get((req, res, next) => {
      try {
        res.send("Get Page Successful");
      } catch (error) {
        return next(error);
      }
    })
    .put((req, res, next) => {
      try {
        res.send("Put Page Successful");
      } catch (error) {
        return next(error);
      }
    })
    .delete((req, res, next) => {
      try {
        res.send("Delete Page Successful");
      } catch (error) {
        return next(error);
      }
    });

  router.use("/:pageId", elementRoutes());

  return router;
};

module.exports = routes;
