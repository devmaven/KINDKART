// models/assignedDonation.model.js (Add new status)
const mongoose = require('mongoose')

// models/assignedDonation.model.js
const assignedDonationSchema = new mongoose.Schema({
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['accepted', 'requested', 'approved', 'task_assigned', 'completed'],
        default: 'accepted'
    },
    acceptedAt: {
        type: Date,
        default: Date.now
    },
    pickupDate: Date,
    deliveryDate: Date,
    notes: String
}, { timestamps: true });


const AssignedDonationModel = mongoose.model('AssignedDonation', assignedDonationSchema);

module.exports = AssignedDonationModel;
