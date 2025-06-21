const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const User = require("../models/User");

const router = express.Router();

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  const secret = speakeasy.generateSecret({
    name: `SatishSen (${email})`
  });

  await User.findOneAndUpdate(
    { email },
    { twoFactorSecret: secret.base32, twoFactorVerified: false },
    { upsert: true }
  );

  const qrData = await qrcode.toDataURL(secret.otpauth_url);
  res.json({ status: true, qr: qrData, secret: secret.base32 });
});

module.exports = router;
