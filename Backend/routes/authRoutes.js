const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const { authUser } = require('../middlewares/auth.middleware');

/* ================= REGISTER ================= */
router.post(
  '/register',
  [
    body('fullname.firstname').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').notEmpty().withMessage('Role is required')
  ],
  authController.registerUser
);

/* ================= LOGIN ================= */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.loginUser
);

/* ================= PROFILE ================= */
router.get('/profile', authUser, authController.getUserProfile);

/* ================= LOGOUT ================= */
router.get('/logout', authUser, authController.logoutUser);

/* ================= FORGOT & RESET PASSWORD ================= */
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Enter a valid email')],
  authController.forgotPassword
);

router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  authController.resetPassword
);

module.exports = router;
