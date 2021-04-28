const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
