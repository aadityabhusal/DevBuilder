const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "Enter your first name",
  },
  lastName: {
    type: String,
    required: "Enter your last name",
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Enter your email address",
  },
  password: {
    type: String,
    minLength: 8,
    required: "Enter your password",
  },
  sites: {
    type: Array,
    default: [],
  },

  emailVerificationKey: {
    type: String,
    required: true,
  },

  passwordResetKey: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.pre("findOneAndUpdate", async function (next) {
  this.options.runValidators = true;
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else next();
});

module.exports = mongoose.model("User", UserSchema);
