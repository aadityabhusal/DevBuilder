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
    required: "Enter your password",
  },
  sites: {
    type: Array,
    default: [],
  },

  status: {
    type: Number,
    default: 0,
  },
});

UserSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("User", UserSchema);
