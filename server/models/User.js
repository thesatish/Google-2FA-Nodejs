const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: String,
  twoFactorVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
