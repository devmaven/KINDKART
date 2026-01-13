const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const donationController = require('../controllers/donationController');
const { authUser } = require('../middlewares/auth.middleware');

// Create Donation
router.post(
  '/create',
  [
    body('itemType').notEmpty().withMessage('Item type is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be positive'),
    body('condition').notEmpty().withMessage('Condition is required')
  ], 
  donationController.createDonation
);

// Get My Donations
router.get(
  '/my-donations',
  donationController.getMyDonations
);

module.exports = router;
