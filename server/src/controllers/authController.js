const { authSchema } = require("../helpers/validation");
const User = require("../models/userModel");

const register = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    if (await User.exists({ email: result.email }))
      throw new Error("Email already exists");
    let newUser = new User(result);
    let user = await newUser.save();
    let { password, ...data } = await user.toJSON();
    res.send({ ...data, message: "User Created" });
  } catch (error) {
    error.status = error.isJoi ? 422 : 409;
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    res.send({ message: "Login Route" });
  } catch (error) {
    return next(error);
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
    res.send({ message: "Refresh Token Route" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
