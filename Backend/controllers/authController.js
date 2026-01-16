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
  const { email } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Generate random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash token before saving to DB
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  // Send token in response (no email)
  res.status(200).json({
    message: 'Use this token to reset password (valid for 15 minutes)',
    resetToken
  });
};

/* ================= RESET PASSWORD ================= */
module.exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' });

  // Hash token to compare with DB
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  }).select('+password');

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  // Update password
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: 'Password reset successfully' });
};
