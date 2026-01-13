const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { authUser } = require('../middlewares/auth.middleware'); 

/* ================= REGISTER ================= */
router.post(
  '/register',
  [
    body('fullname.firstname')
      .notEmpty()
      .withMessage('Name is required'),

    body('email')
      .isEmail()
      .withMessage('Enter a valid email'),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),

    body('role')
      .notEmpty()
      .withMessage('Role is required')
  ],
  authController.registerUser
);

/* ================= LOGIN ================= */
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Enter a valid email'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  authController.loginUser
);
router.get('/profile',authUser, authController.getUserProfile)
module.exports = router;
