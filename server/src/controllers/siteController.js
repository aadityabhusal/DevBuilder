const Site = require("../models/siteModel");
const User = require("../models/userModel");
const Page = require("../models/pageModel");
const JSZip = require("jszip");
const { getHeadHTML, getBodyHTML } = require("./getPageHTML");

const createSite = async (req, res, next) => {
  try {
    let newSite = new Site(req.body);
    let site = await newSite.save();
    let user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { sites: { siteId: site._id, siteName: site.name } } },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    let newPage = new Page({
      siteId: site._id,
      name: "index.html",
    });
    let page = await newPage.save();

    await Site.findOneAndUpdate(
      { _id: site._id },
      { $push: { pages: { pageId: page._id, pageName: page.name } } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    let { sites, password, ...data } = await user.toJSON();
    res.status(201).json(sites);
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
};

const getSite = async (req, res, next) => {
  try {
    let site = await Site.findById(req.params.siteId);
    res.send(site);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateSite = async (req, res, next) => {
  try {
    await Site.findOneAndUpdate({ _id: req.params.siteId }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.sendStatus(200);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteSite = async (req, res, next) => {
  try {
    await Site.deleteOne({ _id: req.params.siteId });
    res.sendStatus(200);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const exportSite = async (req, res, next) => {
  try {
    const zip = new JSZip();
    let pages = await Page.find({ siteId: req.params.siteId });
    pages.forEach(async (page) => {
      let pageHead = getHeadHTML(page.head);
      let pageBody = getBodyHTML(page.body);
      let result = `<!DOCTYPE html><html lang="en"><head>${pageHead}</head>${pageBody}</html>`;
      zip.file(page.name, result);
    });
    const files = await zip.generateAsync({ type: "nodebuffer" });
    res.end(files);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

module.exports = { createSite, getSite, updateSite, deleteSite, exportSite };
