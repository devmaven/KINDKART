// models/receiverRequest.model.js
const mongoose = require('mongoose');

const receiverRequestSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssignedDonation',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'assigned'],
        default: 'pending'
    },
    message: {
        type: String
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    respondedAt: Date,
    notes: String
}, { timestamps: true });

const ReceiverRequestModel = mongoose.model('ReceiverRequest', receiverRequestSchema);

module.exports = ReceiverRequestModel;