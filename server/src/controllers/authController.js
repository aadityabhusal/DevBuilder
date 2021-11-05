const User = require("../models/userModel");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../helpers/validation");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  signVerificationToken,
  verifyVerificationToken,
} = require("../helpers/jwt");
const createError = require("http-errors");
const { sendEmail } = require("../helpers/sendEmail");

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);
    if (await User.exists({ email: result.email }))
      throw createError.Conflict(`${result.email} has already been registered`);

    let newUser = new User(result);
    let user = await newUser.save();

    let emailVerificationKey = await signVerificationToken(user.id);
    if (
      !(await sendEmail({
        to: result.email,
        type: "emailVerification",
        data: { emailVerificationKey },
      }))
    ) {
      throw createError.InternalServerError(
        "Could not send email. Please try again."
      );
    }

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
    if (!req.body.emailVerificationKey)
      throw createError.BadRequest("Invalid Email Verification Key");

    let { aud } = await verifyVerificationToken(req.body.emailVerificationKey);
    let user = await User.findOneAndUpdate(
      { _id: aud, status: 0 },
      { status: 1 },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(Boolean(user));
    if (!user) {
      throw createError.BadRequest(
        "Email Already Verified or Account Doesn't Exist"
      );
    }

    let { id, firstName, lastName, status } = user;
    const accessToken = await signAccessToken(id, firstName, lastName, status);
    res.send({ accessToken, message: "Email Verification Successful" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const result = await forgotPasswordSchema.validateAsync(req.body);
    let passwordResetKey = await signVerificationToken("", result.email);

    if (
      !(await sendEmail({
        to: result.email,
        type: "passwordReset",
        data: { passwordResetKey },
      }))
    ) {
      throw createError.InternalServerError(
        "Could not send email. Please try again."
      );
    }

    res.send({ message: "Password Reset Link Sent" });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Email Provided"));
    next(error);
  }
};

const checkResetPasswordKey = async (req, res, next) => {
  console.log("checkResetPasswordKey", req.body);
  try {
    if (!req.body.passwordResetKey)
      throw createError.BadRequest("Invalid Password Reset Key");

    let { aud } = await verifyVerificationToken(req.body.passwordResetKey);
    let isValid = await User.findOne({ email: aud });

    if (!isValid) throw createError.BadRequest("Invalid Password Reset Key");
    res.send({ message: "Valid Password Reset Key" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  console.log("checkResetPasswordKey", req.body);
  try {
    if (!req.body.password || !req.body.passwordResetKey)
      throw createError.BadRequest("Invalid Password or Password Reset Key");

    const { password, passwordResetKey } =
      await resetPasswordSchema.validateAsync(req.body);

    let { aud } = await verifyVerificationToken(passwordResetKey);

    let user = await User.findOneAndUpdate(
      { email: aud },
      { password },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!user) throw createError.BadRequest("Reset Password Failed");
    res.send({ message: "Reset Password Successful" });
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
  forgotPassword,
  checkResetPasswordKey,
  resetPassword,
};
