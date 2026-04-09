 const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const receiverController = require('../controllers/recieverController');
const { authUser } = require('../middlewares/auth.middleware');

router.get('/available-donations/:ngoId', authUser,receiverController.getAvailableDonations)
router.post('/request-donation/:assignmentId', authUser,receiverController.requestDonation)
router.get('/my-stats', authUser,receiverController.getReceiverStatistics)


module.exports= router;