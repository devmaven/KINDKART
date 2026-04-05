// services/receiverRequest.service.js
const ReceiverRequest = require('../models/recieverRequest.model');
const AssignedDonation = require('../models/assignedDonation.model');
const mongoose = require('mongoose')

module.exports.createRequest = async ({
    assignmentId,
    receiverId,
    ngoId,
    donationId,
    message
}) => {
    if (!assignmentId || !receiverId || !ngoId || !donationId) {
        throw new Error('Missing required fields');
    }

    // Check if request already exists
    const existingRequest = await ReceiverRequest.findOne({
        assignmentId,
        receiverId,
        status: { $in: ['pending', 'approved'] }
    });

    if (existingRequest) {
        throw new Error('You have already requested this donation');
    }

    const request = await ReceiverRequest.create({
        assignmentId,
        receiverId,
        ngoId,
        donationId,
        message: message || '',
        status: 'pending'
    });

    // Update assignment status
    await AssignedDonation.findByIdAndUpdate(assignmentId, {
        status: 'requested'
    });

    return request;
};

module.exports.getRequestsByNgo = async (ngoId, status = null) => {
    if (!ngoId) {
        throw new Error('NGO ID is required');
    }

    let query = { "ngoId":ngoId };
    if (status) {
        query.status = status;
    }


   
    const requests = await ReceiverRequest.find(query)
        .populate('receiverId', 'fullname email address phone')
        .populate('donationId', 'fullname email address phone')
        .populate('assignmentId')
        .sort({ requestedAt: -1 });
    console.log('ghg', requests)
    return requests;
};

module.exports.getRequestsByReceiver = async (receiverId, status = null) => {
    if (!receiverId) {
        throw new Error('Receiver ID is required');
    }

    let query = { receiverId };
    if (status) {
        query.status = status;
    }

    const requests = await ReceiverRequest.find(query)
        .populate('ngoId', 'fullname email')
        .populate('donationId')
        .sort({ requestedAt: -1 });

    return requests;
};

module.exports.updateRequestStatus = async (requestId, status, responseMessage = null) => {
    if (!requestId || !status) {
        throw new Error('Request ID and status are required');
    }

    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
    }

    const request = await ReceiverRequest.findById(requestId);

    if (!request) {
        throw new Error('Request not found');
    }

    request.status = status;
    request.respondedAt = new Date();
    if (responseMessage) {
        request.notes = responseMessage;
    }

    await request.save();

    // Update assignment status
    if (status === 'approved') {
        await AssignedDonation.findByIdAndUpdate(request.assignmentId, {
            status: 'approved'
        });
    }

    return request;
};