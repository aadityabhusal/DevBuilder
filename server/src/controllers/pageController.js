const Page = require("../models/pageModel");
const Site = require("../models/siteModel");
const mongoose = require("mongoose");

const createPage = async (req, res, next) => {
  try {
    let newPage = new Page(req.body);
    let page = await newPage.save();

    let site = await Site.findOneAndUpdate(
      { _id: req.body.siteId },
      { $push: { pages: { pageId: page._id, pageName: page.name } } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    let { pages, ...data } = await site.toJSON();

    res.status(201).json(pages);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const getPage = async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.pageId);
    res.send(page);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updatePage = async (req, res, next) => {
  try {
    await Page.findOneAndUpdate({ _id: req.params.pageId }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.sendStatus(200);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deletePage = async (req, res, next) => {
  try {
    await Page.deleteOne({ _id: req.params.pageId });

    let site = await Site.findOneAndUpdate(
      { _id: req.body.siteId },
      {
        $pull: {
          pages: { pageId: mongoose.Types.ObjectId(req.params.pageId) },
        },
      },
      { safe: true, upsert: true, new: true, useFindAndModify: false }
    );

    let { pages, ...data } = await site.toJSON();

    res.status(201).json(pages);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

// const updateStyles = async (req, res, next) => {
//   try {
//     await Page.findOneAndUpdate({ _id: req.params.pageId }, req.body, {
//       new: true,
//       useFindAndModify: false,
//     });
//     res.sendStatus(200);
//   } catch (error) {
//     error.status = 400;
//     return next(error);
//   }
// };

module.exports = {
  createPage,
  getPage,
  updatePage,
  deletePage,
};
