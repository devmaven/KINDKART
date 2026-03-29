// const User = require('../models/user.model');
// const NgoProfile = require('../models/ngoprofile.model');
// const adminService = require('../services/admin.service');
// const { validationResult } = require('express-validator');

// /* ================= GET ALL USERS ================= */
// module.exports.getAllUsers = async (req, res) => {
//   const users = await User.find();
//   res.status(200).json(users);
// };

// /* ================= GET ALL NGOs ================= */
// module.exports.getAllNGOs = async (req, res) => {
//   const ngos = await NgoProfile.find();
//   res.status(200).json(ngos);
// };

// /* ================= APPROVE NGO ================= */
// module.exports.approveNGO = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const ngo = await adminService.approveNGO({
//     ngoId: req.params.ngoId
//   });

//   res.status(200).json({
//     message: 'NGO approved successfully',
//     ngo
//   });
// };

// /* ================= BLOCK USER ================= */
// module.exports.blockUser = async (req, res) => {
//   const user = await User.findByIdAndUpdate(
//     req.params.userId,
//     { isLocked: true },
//     { new: true }
//   );

//   res.status(200).json({
//     message: 'User blocked successfully',
//     user
//   });
// };


const User = require('../models/user.model');
const NgoProfile = require('../models/ngoprofile.model');
const Donation = require('../models/donation.model');
const adminService = require('../services/admin.service');
const { validationResult } = require('express-validator');

/* ================= GET ALL USERS ================= */
module.exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

/* ================= GET ALL NGOs ================= */
module.exports.getAllNGOs = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const ngos = await NgoProfile.find();
    res.status(200).json(ngos);

  } catch (error) {
    res.status(500).json({ message: "Error fetching NGOs" });
  }
};

/* ================= APPROVE NGO ================= */
module.exports.approveNGO = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

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

  } catch (error) {
    res.status(500).json({ message: "Error approving NGO" });
  }
};

/* ================= BLOCK USER ================= */
module.exports.blockUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isLocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: 'User blocked successfully',
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Error blocking user" });
  }
};

/* ================= GET ALL DONATIONS ================= */
module.exports.getAllDonations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json(donations);

  } catch (error) {
    res.status(500).json({ message: "Error fetching donations" });
  }
};

/* ================= APPROVE DONATION ================= */
module.exports.approveDonation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({
      message: "Donation approved",
      donation
    });

  } catch (error) {
    res.status(500).json({ message: "Error approving donation" });
  }
};

/* ================= REJECT DONATION ================= */
module.exports.rejectDonation = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({
      message: "Donation rejected",
      donation
    });

  } catch (error) {
    res.status(500).json({ message: "Error rejecting donation" });
  }
};