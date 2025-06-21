require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const setup2FA = require("./routes/setup2fa");
const verify2FA = require("./routes/verify2fa");
const check2FA = require("./middleware/check2fa");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/2fa/setup", setup2FA);
app.use("/2fa/verify", verify2FA);

// Sample protected route
app.get("/secure-data", check2FA, (req, res) => {
  res.send({ status: true, messgae: "Welcome to the 2FA-protected route." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
