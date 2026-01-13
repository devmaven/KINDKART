const User = require('../models/user.model');
const NgoProfile = require('../models/ngoprofile.model');
const adminService = require('../services/admin.service');
const { validationResult } = require('express-validator');

/* ================= GET ALL USERS ================= */
module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

/* ================= GET ALL NGOs ================= */
module.exports.getAllNGOs = async (req, res) => {
  const ngos = await NgoProfile.find();
  res.status(200).json(ngos);
};

/* ================= APPROVE NGO ================= */
module.exports.approveNGO = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ngo = await adminService.approveNGO({
    ngoId: req.params.ngoId
  });

  res.status(200).json({
    message: 'NGO approved successfully',
    ngo
  });
};

/* ================= BLOCK USER ================= */
module.exports.blockUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { isLocked: true },
    { new: true }
  );

  res.status(200).json({
    message: 'User blocked successfully',
    user
  });
};
