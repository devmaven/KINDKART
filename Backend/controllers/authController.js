const userModel = require('../models/user.model');
const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const blacklistTokenModel = require('../models/blacklistToken.model');

/* ================= REGISTER ================= */
module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password, address, role } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await authService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    address,
    role
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

/* ================= LOGIN ================= */
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = user.generateAuthToken();
  res.cookie('token', token);
  res.status(200).json({ token, user });
};

/* ================= PROFILE ================= */
module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

/* ================= LOGOUT ================= */
module.exports.logoutUser = async (req, res) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (token) await blacklistTokenModel.create({ token });
  res.status(200).json({ message: 'Logged out' });
};


/* ================= FORGOT PASSWORD ================= */
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({
      success: true,
      message: "User verified. You can reset password.",
      email: user.email,
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


/* ================= RESET PASSWORD ================= */
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

   console.log("Email:", email);
  console.log("Password:", password); 
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const hashedPassword = await  bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
