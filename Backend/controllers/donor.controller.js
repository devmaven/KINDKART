const Donation = require('../models/donation.model');
exports.createDonation = async (req, res) => {
      try {
        console.log("Logged in user:", req.user);  
    const { itemType, quantity, condition, pickupType, address } = req.body;
        const donorId = req.user._id;
            
        if (!itemType || !quantity || !condition || !deliveryOption || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

        const donation = await Donation.create({
      donor: donorId,
      itemType,
      quantity,
      condition,
      pideliveryOption,
      address
    });

        res.status(201).json({
      message: "Donation created successfully",
      donation
    });

      } catch (error) {
    res.status(500).json({
      message: "Error creating donation",
      error: error.message
    });
  }
};