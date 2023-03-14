require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEMail = async (email, OTP) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  let mailOptions = {
    from: `"TLA" ${process.env.EMAIL}`,
    to: email, // you can use an array to collect list of receivers
    subject: 'TLA email verification',
    html: `Your one time password: <b>${OTP}</b>, expires in 10 minutes`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info; // return the info object if there's no error
  } catch (error) {
    throw new Error(`Error sending email: ${error}`); // throw an error if there's an error
  }
};

module.exports = sendEMail;