const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema for the OTP code collection
const otpCodeSchema = new Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "10m" }, // set a TTL of 10 minutes for the OTP code
});

// Create a model for the OTP code collection
module.exports = mongoose.model("OtpCode", otpCodeSchema);