const donationService = require('../services/donation.service');
const { validationResult } = require('express-validator');

/* ================= CREATE DONATION ================= */
module.exports.createDonation = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Validation Errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("Request Body:", req.body);
    console.log("User:", req.user);

  
    if (!req.user || !req.user._id) {
      console.log("User not found in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { itemType, quantity, condition, deliveryOption } = req.body;


    if (!itemType || !quantity) {
      console.log("Missing fields");
      return res.status(400).json({ message: "Required fields missing" });
    }

    const donation = await donationService.createDonation({
      donorId: req.user._id,
      itemType,
      quantity,
      condition,
      deliveryOption
    });

    console.log("Created Donation:", donation);

    res.status(201).json({ donation });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // IMPORTANT
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};