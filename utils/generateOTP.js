const otpGenerator = require("otp-generator");

const generateOtp = () => {

    const OTP = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });
    return OTP;
};

module.exports = generateOtp