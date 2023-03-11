const otpGenerator = requie("otp-generator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const generateOtp = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

// Send the verification code to the user's email
const sendEMail = async (email) => {
  let OTP = generateOtp();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification Code",
    text: `Your verification code is: ${OTP}`,
  };
  let info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEMail;
