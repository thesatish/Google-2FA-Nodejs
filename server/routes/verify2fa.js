const express = require("express");
const speakeasy = require("speakeasy");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, token } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.twoFactorSecret) {
    return res.status(400).send("2FA not set up");
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1
  });

  if (!verified) {
    return res.status(401).send({ status: false, message: "Invalid token" });
  }

  user.twoFactorEnabled = true;
  user.twoFactorVerified = true;
  await user.save();

  res.send({ status: true, message: "2FA verified successfully" });
});

module.exports = router;
