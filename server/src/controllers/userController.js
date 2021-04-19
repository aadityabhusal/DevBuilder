const User = require("../models/userModel");
const sha256 = require("crypto-js/sha256");

const createUser = async (req, res, next) => {
  try {
    req.body.password = sha256(req.body.password);
    let newUser = new User(req.body);
    let user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    res.send(user);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      useFindAndModify: false,
    });
    res.sendStatus(200);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(200);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
