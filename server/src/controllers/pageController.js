const Page = require("../models/pageModel");
const Site = require("../models/siteModel");
const mongoose = require("mongoose");
const JSZip = require("jszip");
const { getHeadHTML, getBodyHTML, getStyles } = require("./getPageHTML");

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

    res.send(pages);
  } catch (error) {
    error.status = 500;
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
    res.send({ message: "Page Updated" });
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

    res.send(pages);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const exportPage = async (req, res, next) => {
  try {
    let page = await Page.findById(req.params.pageId);
    let pageHead = getHeadHTML(page.head);
    let pageBody = getBodyHTML(page.body);
    const zip = new JSZip();
    let pageName = page.name.split(".")[0];
    let { links, styles } = getStyles(page.head.style, pageName);
    styles.forEach(async (item) => {
      zip.folder(pageName).file(item[0], item[1]);
    });

    let result = `<!DOCTYPE html><html lang="en"><head>${pageHead}${links}</head>${pageBody}</html>`;

    zip.file(page.name, result);
    const files = await zip.generateAsync({ type: "nodebuffer" });
    res.end(files);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

module.exports = {
  createPage,
  getPage,
  updatePage,
  deletePage,
  exportPage,
};
