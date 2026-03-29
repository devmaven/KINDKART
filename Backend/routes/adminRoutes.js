// const express = require('express');
// const router = express.Router();

// const adminController = require('../controllers/adminController');
// const { body, param } = require('express-validator');
// const { authAdmin } = require('../middlewares/auth.middleware'); 

// /**
//  * ADMIN ROUTES
//  */

// // get all users
// router.get(
//   '/users',
//   adminController.getAllUsers
// );

// // get all NGOs
// router.get(
//   '/ngos',
//   adminController.getAllNGOs
// );

// // approve NGO
// router.post(
//   '/approve-ngo/:ngoId',
//   param('ngoId').isMongoId(),
//   adminController.approveNGO
// );

// // block user
// router.post(
//   '/block-user/:userId',
//   param('userId').isMongoId(),
//   adminController.blockUser
// );

// module.exports = router;


const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authUser } = require('../middlewares/auth.middleware');

// Users
router.get('/users', authUser, adminController.getAllUsers);
router.put('/block-user/:userId', authUser, adminController.blockUser);

// NGOs
router.get('/ngos', authUser, adminController.getAllNGOs);
router.put('/approve-ngo/:ngoId', authUser, adminController.approveNGO);

// Donations
router.get('/donations', authUser, adminController.getAllDonations);
router.put('/approve/:id', authUser, adminController.approveDonation);
router.put('/reject/:id', authUser, adminController.rejectDonation);

module.exports = router;