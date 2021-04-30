const Site = require("../models/siteModel");
const User = require("../models/userModel");
const Page = require("../models/pageModel");
const mongoose = require("mongoose");
const JSZip = require("jszip");
const { getHeadHTML, getBodyHTML, getStyles } = require("./getPageHTML");

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
    res.send({ message: "Site Updated" });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteSite = async (req, res, next) => {
  try {
    await Site.deleteOne({ _id: req.params.siteId });
    await Page.deleteMany({ siteId: req.params.siteId });

    await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $pull: {
          sites: { siteId: mongoose.Types.ObjectId(req.params.siteId) },
        },
      },
      { safe: true, upsert: true, new: true, useFindAndModify: false }
    );

    res.send({ message: "Site Deleted" });
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
      let pageName = page.name.split(".")[0];

      let { links, styles } = getStyles(page.head.style, pageName);
      styles.forEach(async (item) => {
        zip.folder(pageName).file(item[0], item[1]);
      });

      let result = `<!DOCTYPE html><html lang="en"><head>${pageHead}${links}</head>${pageBody}</html>`;
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
