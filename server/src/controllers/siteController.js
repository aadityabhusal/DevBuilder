const Site = require("../models/siteModel");

const createSite = async (req, res, next) => {
  try {
    let newSite = new Site(req.body);
    let site = await newSite.save();
    res.status(201).json(site);
  } catch (error) {
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

module.exports = { createSite, getSite, updateSite, deleteSite };
