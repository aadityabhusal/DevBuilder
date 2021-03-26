const User = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
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
    res.json({ message: "User Data Updated" });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.json({ message: "User Deleted" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
