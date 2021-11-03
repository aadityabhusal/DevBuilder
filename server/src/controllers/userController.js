const User = require("../models/userModel");
const Site = require("../models/siteModel");
const Page = require("../models/pageModel");
const createError = require("http-errors");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt");
const { editUserSchema } = require("../helpers/validation");

const getUser = async (req, res, next) => {
  try {
    let data = await User.findById(req.params.userId, {
      firstName: 1,
      lastName: 1,
      email: 1,
      sites: 1,
    });
    res.send(data);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await editUserSchema.validateAsync(req.body);
    if (
      await User.exists({
        email: result.email,
        _id: { $ne: req.params.userId },
      })
    )
      throw createError.Conflict(`${result.email} has already been registered`);

    let user = await User.findOneAndUpdate({ _id: req.params.userId }, result, {
      new: true,
      useFindAndModify: false,
    });
    if (!user) throw createError.NotFound("User Not Found");
    const accessToken = await signAccessToken(
      user.id,
      user.firstName,
      user.lastName,
      user.status
    );
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken, message: "User Updated" });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
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
  getUser,
  updateUser,
  deleteUser,
};
