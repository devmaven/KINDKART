const donationService = require('../services/donation.service');
const { validationResult } = require('express-validator');

/* ================= CREATE DONATION ================= */
module.exports.createDonation = async (req, res, next) => {
  console.log("BODY:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { itemType, quantity, condition, deliveryOption, address } = req.body;

  const donation = await donationService.createDonation({
    donorId: req.user._id,
    itemType,
    quantity,
    condition,
    deliveryOption,
    address
  });

  res.status(201).json({ donation });
};

/* ================= GET MY DONATIONS ================= */
module.exports.getMyDonations = async (req, res, next) => {
  const donations = await donationService.getDonationsByDonor(req.user._id);
  res.status(200).json({ donations });
};
