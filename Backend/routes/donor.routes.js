const express = require('express');
const router = express.Router();

const { createDonation } = require('../controllers/donor.controller');
const { authUser } = require('../middlewares/auth.middleware');

router.post('/create-donation', authUser, createDonation);

module.exports = router;