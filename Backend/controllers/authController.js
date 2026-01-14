const userModel = require('../models/user.model');
const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, address, role } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

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

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();

  res.cookie('token', token);
  
  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res,next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res,next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await blacklistTokenModel.create({ token });

  res.status(200).json({ message: 'Logged out' });
};
