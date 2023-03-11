const User = require("../models/User");
const OTP = require("../models/Otp");
const bcrypt = require("bcrypt");
const loginValidation = require("../validation/loginValidation");
const regValidation = require('../validation/registrationValidation');
const { sendEMail, generateOtp } = require('../services/sendEmail')


const registerUser = async (req, res) => {
    const { error, value } = regValidation(req.body);

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
        return res.send("Email already exists");
    }
   
    try {
        let otpCode = generateOtp()
        let info = await sendEMail(req.body.email, otpCode);
        await new OTP({
            email: req.body.email,
            code: otpCode,
        }).save();
        console.log(info)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }).save();   
        res.status(200).send("An OTP was sent to your account please verify");

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid token");

        const otp = await OTP.findOne({
            userEmail: req.body.email,
            code: req.body.code,
        });
        if (!otp) return res.status(400).send("Invalid token");

        await User.updateOne({ email: user.email, isVerified: true });
        await OTP.findByIdAndRemove(otp._id);

        res.send("email verified sucessfully");
    } catch (error) {
        res.status(400).send("An error occured");
    }
};

const regenerateOTP = async (req, res) => {

    const otp = await new OTP({
        email: req.body.email,
        code: generateOtp(),
    }).save()
        .then(() => {
            let info = sendEMail(otp.email, otp.code);
            console.log(info)
            res.status(200).send({ message: "New OTP code generated" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const { error, value } = loginValidation(req.body);
    if (error) {
        return res.status(401).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ message: "invalid credentials" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        return res.status(401).send({ message: "invalid credentials" });
    }
    const token = user.createJWT();
    res.status(200).send({ user, token });
};

module.exports = { registerUser, login, verifyEmail, regenerateOTP };