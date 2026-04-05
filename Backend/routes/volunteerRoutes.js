 const express = require('express');
const router = express.Router();
const { body } = require("express-validator");

const volunteerController = require('../controllers/volunteerController');
const { authUser } = require('../middlewares/auth.middleware');

router.get('/my-tasks', authUser,volunteerController.getMyTasks)



module.exports= router;