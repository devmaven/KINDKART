const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { body, param } = require('express-validator');
const { authAdmin } = require('../middlewares/auth.middleware'); 

/**
 * ADMIN ROUTES
 */

// get all users
router.get(
  '/users',
  adminController.getAllUsers
);

// get all NGOs
router.get(
  '/ngos',
  adminController.getAllNGOs
);

// approve NGO
router.post(
  '/approve-ngo/:ngoId',
  param('ngoId').isMongoId(),
  adminController.approveNGO
);

// block user
router.post(
  '/block-user/:userId',
  param('userId').isMongoId(),
  adminController.blockUser
);

module.exports = router;
