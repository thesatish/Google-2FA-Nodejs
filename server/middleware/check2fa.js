module.exports = async (req, res, next) => {
  const { email } = req.body;
  const User = require("../models/User");
  const user = await User.findOne({ email });

  if (user && user.twoFactorEnabled && !user.twoFactorVerified) {
    return res.status(403).send("2FA verification required");
  }

  next();
};
