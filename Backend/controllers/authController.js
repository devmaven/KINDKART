const userModel = require('../models/user.model');
const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, address, role } = req.body;

  const existingUser = await userModel.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await authService.createUser({
    name,
    phone,
    address,
    role
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const { phone } = req.body;

  const user = await userModel.findOne({ phone });
  if (!user) {
    return res.status(401).json({ message: 'Invalid phone number' });
  }

  const token = user.generateAuthToken();
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};
module.exports.sendOtp = async (req, res) => {
  res.status(200).json(req.user);
};
module.exports.verifyOtp = async (req, res) => {
  res.status(200).json(req.user);
};
