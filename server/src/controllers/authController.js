const User = require("../models/userModel");
const { registerSchema, loginSchema } = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");
const createError = require("http-errors");

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    if (await User.exists({ email: result.email }))
      throw createError.Conflict(`${result.email} has already been registered`);
    let newUser = new User(result);
    let user = await newUser.save();

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken, message: "User Created" });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    let user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("User Not Found");
    const isMatched = await user.isValidPassword(result.password);
    if (!isMatched) throw createError.Unauthorized("Invalid Email or Password");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res.send({ accessToken, refreshToken, message: "Login Successful" });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Email or Password"));
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res.send({ message: "Logout Route" });
  } catch (error) {
    return next(error);
  }
};
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    let userId = await verifyRefreshToken(refreshToken);
    console.log("userId", userId);
    const accessToken = await signAccessToken(userId);
    const rfToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: rfToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
