const Page = require("../models/pageModel");

const createElement = async (req, res, next) => {
  try {
    let selector = getSelector(req.body);
    await Page.findOneAndUpdate({ _id: req.pageId }, { [selector]: req.body });
    res.sendStatus(200);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const getElement = async (req, res, next) => {
  try {
    let selector = getSelector(req.body);
    let element = await Page.findOne({ _id: req.pageId }, { [selector]: 1 });
    res.status(200).send(element);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const deleteElement = async (req, res, next) => {
  try {
    let selector = getSelector(req.body);
    await Page.findOneAndUpdate(
      { _id: req.pageId },
      { $unset: { [selector]: 1 } }
    );
    res.sendStatus(200);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const getSelector = (body) => {
  let path = "";
  if (body.path.length) {
    path = body.path.join(".children.") + ".children.";
  }
  return "body.children." + path + body._id;
};

module.exports = { createElement, getElement, deleteElement };
