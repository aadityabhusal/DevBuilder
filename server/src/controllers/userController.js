const User = require("../models/userModel");
const Site = require("../models/siteModel");
const Page = require("../models/pageModel");
const sha256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  try {
    req.body.password = req.body.password && sha256(req.body.password);
    if (await User.exists({ email: req.body.email })) {
      throw new Error("Email already exists");
    }
    let newUser = new User(req.body);
    let user = await newUser.save();
    let { password, ...data } = await user.toJSON();
    res.send({ message: "User Created" });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  let email = req.body.email;
  let passwordHash = sha256(req.body.password);
  let user = await User.findOne({ email });

  if (!Boolean(user)) {
    res.send({ error: "User not found" });
  } else if (user.password !== Hex.stringify(passwordHash)) {
    res.send({ error: "Incorrect Password" });
  } else {
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.send({ uid: user._id, token });
  }
};

const getUser = async (req, res, next) => {
  try {
    let data = await User.findById(req.params.userId, {
      firstName: 1,
      lastName: 1,
      sites: 1,
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
    if (!verify) throw new Error("Verification Failed");

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
    let sites = await User.findOne(
      { _id: req.params.userId },
      { sites: 1, _id: 0 }
    );
    let siteNames = sites.sites.map((item) => item.siteId);
    await User.deleteOne({ _id: req.params.userId });
    await Site.deleteMany({ userId: req.params.userId });
    await Page.deleteMany({ siteId: { $in: siteNames } });
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
