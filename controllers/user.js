const User = require('../models/User');
const otp = require('../models/otp');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/loginValidation');
const regValidation = require('../validation/registrationValidation');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateVerificationCode = () => {
  const otp = Math.floor(Math.random() * 1000000);
  return otp;
};

const registerUser = async (req, res) => {
  const { error, value } = regValidation(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.send('Already existing');
  }

  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });

    //saving in database
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error, value } = loginValidation(req.body);
  if (error) {
    return res.status(401).send({ message: error.details[0].message });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: 'invalid credentials' });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).send({ message: 'invalid credentials' });
  }
  const token = user.createJWT();
  res.status(200).json({ user: { name: user.name }, token });
};

module.exports = { registerUser, login };

const registerUser2 = async (req, res) => {
  const { error, value } = regValidation(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  try {
    const { name, email, password } = req.body;

    // Step 1: Generate a unique OTP code
    const otpCode = generateOtpCode();

    // Step 2: Store the OTP code in a secure database, associated with the user's email address
    await saveOtpCode(email, otpCode);

    // Step 3: Send the OTP code to the user's registered email address or mobile number
    await sendOtpCode(email, otpCode);

    // Step 4: Prompt the user to enter the OTP code
    const userOtpCode = req.body.otpCode;

    // Step 5: Verify that the OTP code entered by the user matches the code stored in the database
    const isValidOtpCode = await verifyOtpCode(email, userOtpCode);

    if (!isValidOtpCode) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // Step 6: Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 7: Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword });

    // Step 8: Save the user in the database
    await user.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Helper function to generate a unique OTP code
const generateOtpCode = () => {
  // Generate a random 6-digit number
  return Math.floor(100000 + Math.random() * 900000);
};

// Helper function to store the OTP code in a secure database
const saveOtpCode = async (email, otpCode) => {
  // Create a new document with the email and OTP code
  const otpDocument = new OtpCode({ email, code: otpCode });

  // Save the document in the OTP code collection
  try {
    await otpDocument.save();
  } catch (err) {
    console.error(err);
    throw new Error('Error saving OTP code');
  }
};

const sendOtpCode = async (email, otpCode) => {
  const msg = {
    to: email,
    from: 'noreply@example.com',
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otpCode}`,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err);
    throw new Error('Error sending OTP code');
  }
};

const verifyOtpCode = async (email, userOtpCode) => {
  const { email, otp } = req.body;
  try {
    // Find the most recent OTP code document for the given email
    const mostRecentOtpCode = await OtpCode.findOne({ email }).sort({
      createdAt: -1,
    });

    // If no OTP code document is found, return false
    if (!mostRecentOtpCode) {
      return false;
    }

    // Compare the user-provided code to the saved code
    if (mostRecentOtpCode.code === userOtpCode) {
      // If the codes match, delete the OTP code document and return true
      await mostRecentOtpCode.remove();
      return true;
    } else {
      // If the codes don't match, return false
      return false;
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error verifying OTP code');
  }
};
