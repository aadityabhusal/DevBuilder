const express = require("express");
const router = express.Router();

const routes = () => {
  // CRUD elements in a page
  router
    .route("/:elementId")
    .get((req, res, next) => {
      try {
        res.send("Get Element Successful");
      } catch (error) {
        return next(error);
      }
    })
    .post((req, res, next) => {
      try {
        res.send("Post Element Successful");
      } catch (error) {
        return next(error);
      }
    })
    .put((req, res, next) => {
      try {
        res.send("Put Element Successful");
      } catch (error) {
        return next(error);
      }
    })
    .delete((req, res, next) => {
      try {
        res.send("Delete Element Successful");
      } catch (error) {
        return next(error);
      }
    });

  return router;
};

module.exports = routes;
