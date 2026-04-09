// services/task.service.js (add this new function)
const ReceiverRequest = require('../models/recieverRequest.model')
const Task = require('../models/task.model')
module.exports.createTaskFromRequest = async ({
    requestId,
    volunteerId,
    scheduledDate,
    assignedBy,
    notes,
    priority = 'medium'
}) => {
      console.log('sds', volunteerId, scheduledDate, notes, requestId)
    if (!requestId || !volunteerId || !scheduledDate || !assignedBy) {
        throw new Error('Missing required fields');
    }

    const request = await ReceiverRequest.findById(requestId)
        .populate('assignmentId donationId receiverId');

    if (!request) {
        throw new Error('Request not found');
    }

    if (request.status !== 'approved') {
        throw new Error('Request must be approved before assigning task');
    }

    const assignment = request.assignmentId;
    const donation = request.donationId;
    const receiver = request.receiverId;

    // Create task for volunteer
    const task = await Task.create({
        assignmentId: assignment._id,
        donationId: donation._id,
        requestId: request._id, // Link to request
        type: 'Delivery',
        itemName: donation.itemType,
        quantity: donation.quantity,
        location: receiver.address || 'Address not provided',
        scheduledDate: scheduledDate,
        priority: priority,  // Use the priority from parameter
        assignedTo: volunteerId,
        assignedBy: assignedBy,
        notes: notes || `Deliver to receiver: ${receiver.fullname.firstname} ${receiver.fullname.lastname || ''}`,
        status: 'assigned'
    });

    // Update request status
    request.status = 'assigned';
    await request.save();

    // Update assignment status
    assignment.status = 'task_assigned';
    await assignment.save();

    return task;
};