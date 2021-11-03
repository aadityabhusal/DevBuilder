const User = require("../models/userModel");
const { registerSchema, loginSchema } = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt");
const createError = require("http-errors");
const { sendEmail } = require("../helpers/sendEmail");
const { generateKey } = require("../helpers/generateKey");

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    if (await User.exists({ email: result.email }))
      throw createError.Conflict(`${result.email} has already been registered`);

    result.emailVerificationKey = generateKey();
    if (
      !(await sendEmail({
        to: result.email,
        type: "emailVerification",
        data: { emailVerificationKey: result.emailVerificationKey },
      }))
    ) {
      throw createError.ExpectationFailed(
        "Could not send email. Please try again."
      );
    }

    let newUser = new User(result);
    let user = await newUser.save();
    const accessToken = await signAccessToken(
      user.id,
      user.firstName,
      user.lastName,
      user.status
    );
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

    const accessToken = await signAccessToken(
      user.id,
      user.firstName,
      user.lastName,
      user.status
    );
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
    if (!req.headers["authorization"]) throw createError.Unauthorized();
    const oldAccessToken = req.headers["authorization"].split(" ")[1];
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    let { _id, firstName, lastName, status } = await verifyRefreshToken(
      oldAccessToken,
      refreshToken
    );
    const accessToken = await signAccessToken(_id, firstName, lastName, status);
    const rfToken = await signRefreshToken(_id);
    res.send({ accessToken, refreshToken: rfToken });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    let { emailVerificationKey } = req.body;
    let isValid = await User.findOne({ emailVerificationKey });

    if (!isValid)
      throw createError.BadRequest("Invalid Email Verification Key");
    if (isValid && isValid.status === 1)
      throw createError.BadRequest("Email Already Verified");

    let user = await User.findOneAndUpdate(
      { emailVerificationKey },
      { status: 1 },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!user) throw createError.BadRequest("Email Verification Failed");

    let { id, firstName, lastName, status } = user;
    const accessToken = await signAccessToken(id, firstName, lastName, status);
    const refreshToken = await signRefreshToken(id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
};
