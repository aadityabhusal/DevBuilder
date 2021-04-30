require("dotenv").config({ path: __dirname + "/../.env" });
const User = require("../models/userModel");
const sha256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    req.body.password = sha256(req.body.password);
    let newUser = new User(req.body);
    let user = await newUser.save();
    let { password, ...data } = await user.toJSON();
    res.status(201).json(data);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let passwordHash = sha256(req.body.password);
    let user = await User.findOne({ email });

    if (!Boolean(user)) {
      throw new Error("User not found");
    }
    if (user.password !== Hex.stringify(passwordHash)) {
      throw new Error("Incorrect Password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);

    res.send({ uid: user._id, token });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    let data = await User.findById(req.params.userId, {
      firstName: 1,
      lastName: 1,
    });
    res.send(data);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw new Error("Unauthenticated User");

    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verify) throw new Error("Unauthenticated User");

    let { password, ...data } = await (
      await User.findById(verify._id)
    ).toJSON();
    res.send(data);
  } catch (error) {
    error.status = 200;
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = Hex.stringify(sha256(req.body.password));
    }
    let { password, ...data } = await (
      await User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
        new: true,
        useFindAndModify: false,
      })
    ).toJSON();
    res.send(data);
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.send({ message: "User Deleted" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
  authenticateUser,
  updateUser,
  deleteUser,
};
