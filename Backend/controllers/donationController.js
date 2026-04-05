const donationService = require('../services/donation.service');
const { validationResult } = require('express-validator');
const Donation = require('../models/donorprofile.model');
const mongoose = require('mongoose')

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

    res.status(201).json({
      success: true,
      message: "Donation added successfully",
      data:donation });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // IMPORTANT
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/* ================= Get all donations for a specific donor ================= */
module.exports.getDonationsByDonorId = async (req, res) => {
  
  try {
    const { donorId } = req.params; // Assuming donorId is passed as URL parameter
    // Validate donorId
    if (!donorId) {
      return res.status(400).json({
        success: false,
        message: 'Donor ID is required'
      });
    }

    // Validate if donorId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(donorId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donor ID format'
      });
    }

    // Find all donations for the donor, sorted by creation date (newest first)
    const donations = await Donation.find({ donorId })
      .sort({ createdAt: -1 }) // Most recent first
      .populate('donorId', 'name email'); // Populate donor info if needed

    // Check if donations exist
    if (!donations || donations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No donations found for this donor',
        data: []
      });
    }

    // Return successful response
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });

  } catch (error) {
    console.error('Error fetching donations by donor ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};


module.exports.updateDonation = async (req, res, next) => {
  try {
    const { id } = req.params; // Donation ID from URL parameter

    // Validate donation ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Donation ID is required'
      });
    }

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation ID format'
      });
    }

    // Validate request body (optional validation)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the donation first to check ownership
    const existingDonation = await Donation.findById(id);

    if (!existingDonation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check if the logged-in user owns this donation
    if (existingDonation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this donation'
      });
    }

    // Fields that can be updated
    const allowedUpdates = ['itemType', 'quantity', 'condition', 'deliveryOption', 'status'];
    const updates = {};

    // Only include allowed fields that are present in the request
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Add updatedAt timestamp (if your schema has this field)
    updates.updatedAt = new Date();

    // Update the donation
    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      updates,
      {
        new: true, // Return the updated document
        runValidators: true // Run schema validators
      }
    );

    res.status(200).json({
      success: true,
      message: 'Donation updated successfully',
      data: updatedDonation
    });

  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/* ================= DELETE DONATION ================= */
module.exports.deleteDonation = async (req, res, next) => {
  try {
    const { id } = req.params; // Donation ID from URL parameter

    // Validate donation ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Donation ID is required'
      });
    }

    // Validate if id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid donation ID format'
      });
    }

    // Find the donation first to check ownership
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    // Check if the logged-in user owns this donation
    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this donation'
      });
    }

    // Delete the donation
    await Donation.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Donation deleted successfully',
      data: {
        deletedDonationId: id,
        itemType: donation.itemType
      }
    });

  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
