const Page = require("../models/pageModel");

const createPage = async (req, res, next) => {
  try {
    let newPage = new Page(req.body);
    let page = await newPage.save();
    res.status(201).json(page);
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
    res.sendStatus(200);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createPage, getPage, updatePage, deletePage };
