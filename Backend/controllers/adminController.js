const adminService = require('../services/admin.service');
const { validationResult } = require('express-validator');

module.exports.approveNGO = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ngo = await adminService.approveNGO({
    ngoId: req.body.ngoId
  });
  
   
  res.status(200).json({
    message: 'NGO approved successfully',
    ngo
  });
};

module.exports.rejectNGO = async (req, res) => {
  const { ngoId } = req.body;

  await adminService.rejectNGO({ ngoId });

  res.status(200).json({
    message: 'NGO rejected successfully'
  });
};

module.exports.getAllNGOs = async (req, res) => {}
module.exports.getAllUsers= async (req, res) => {}
module.exports.blockUser = async (req, res) => {}.
