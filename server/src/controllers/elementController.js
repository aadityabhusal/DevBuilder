const mongoose = require("mongoose");
const Page = require("../models/pageModel");

const createElement = async (req, res, next) => {
  try {
    let newId = mongoose.Types.ObjectId();
    req.body._id = newId;
    // You have to do Nesting Update to the Page's body object
    // let page = Page.find({ _id: req.pageId });

    let parent = await Page.find({
      _id: req.pageId,
      "body.children": {
        $elemMatch: { _id: new mongoose.Types.ObjectId(req.params.parentId) },
      },
    });

    // await Page.findOneAndUpdate(
    //   {
    //     _id: req.pageId,
    //     "body.children": {
    //       $elemMatch: { _id: new mongoose.Types.ObjectId(req.params.parentId) },
    //     },
    //   },
    //   { $push: {
    //     "body.$.children":{

    //     }
    //   } },
    //   {
    //     new: true,
    //     useFindAndModify: false,
    //   }
    // );

    res.status(200).send(parent);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const getElement = (req, res, next) => {
  try {
    res.send("Get Element Successful");
  } catch (error) {
    return next(error);
  }
};

const updateElement = (req, res, next) => {
  try {
    res.send("Put Element Successful");
  } catch (error) {
    return next(error);
  }
};

const deleteElement = (req, res, next) => {
  try {
    res.send("Delete Element Successful");
  } catch (error) {
    return next(error);
  }
};

module.exports = { createElement, getElement, updateElement, deleteElement };
