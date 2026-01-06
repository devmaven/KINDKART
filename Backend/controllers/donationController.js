const donationService = require('../services/donation.service');
const { validationResult } = require('express-validator');

module.exports.createDonation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const donation = await donationService.createDonation({
    donorId: req.user._id,
    itemType: req.body.itemType,
    quantity: req.body.quantity,
    condition: req.body.condition,
    deliveryOption: req.body.deliveryOption
  });

  res.status(201).json(donation);
};

module.exports.getMyDonations = async (req, res) => {
  const donations = await donationService.getDonationsByDonor(req.user._id);
  res.status(200).json(donations);
};
