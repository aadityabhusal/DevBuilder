const User = require("../models/userModel");
const { registerSchema, loginSchema } = require("../helpers/validation");
const { signAccessToken } = require("../helpers/jwt");

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    if (await User.exists({ email: result.email }))
      throw new Error("Email already exists");
    let newUser = new User(result);
    let user = await newUser.save();
    const accessToken = await signAccessToken(user.id);
    res.send({ accessToken, message: "User Created" });
  } catch (error) {
    error.status = error.isJoi === true ? 422 : 409;
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    let user = await User.findOne({ email: result.email });
    if (!user) throw new Error("User Not Found");

    const isMatched = await user.isValidPassword(result.password);
    if (!isMatched) throw new Error("Invalid Username or Password");

    const accessToken = await signAccessToken(user.id);

    res.send({ accessToken, message: "Login Successful" });
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Invalid Username or Password";
    }
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
