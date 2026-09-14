const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone_number: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
    },

    membership_status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    account_verified: {
      type: Boolean,
      default: false,
    },

    company: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;