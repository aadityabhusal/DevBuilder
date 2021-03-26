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
  phone: {
    type: Number,
    required: "Enter your phone number",
  },
  sites: {
    type: Array,
    default: [],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
