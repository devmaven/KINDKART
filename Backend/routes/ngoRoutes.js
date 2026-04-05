 const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const ngoController = require('../controllers/ngoController');
const { authUser } = require('../middlewares/auth.middleware');

router.get('/all-donations', authUser,ngoController.getAllDonationsWithDonorDetails )
router.post('/accept-donation/:donationId', authUser,ngoController.ngoAcceptDonation )
router.get('/requests', authUser,ngoController.getReceiverRequests )
router.put('/respond-request/:requestId', authUser,ngoController.respondToRequest )
router.post('/assign-task/:requestId', authUser,ngoController.assignTaskFromRequest );
router.get('/all-volunteers', authUser,ngoController.getVolunteers );


module.exports= router;