const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const authController = require('../controllers/authController');

// Send OTP
router.post(
  '/send-otp',
  [
    body('phone')
      .isMobilePhone()
      .withMessage('Enter a valid phone number')
  ],
authController.sendOtp
);

// Verify OTP
router.post(
  '/verify-otp',
  [
    body('phone')
      .isMobilePhone()
      .withMessage('Enter a valid phone number'),
    body('otp')
      .isLength({ min: 4, max: 6 })
      .withMessage('OTP must be 4–6 digits')
  ],
 authController.verifyOtp
);

module.exports = router;
