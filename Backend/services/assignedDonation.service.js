const AssignedDonation = require('../models/assignedDonation.model');
const Donation = require('../models/donorprofile.model');

module.exports.createAssignment = async ({
    donationId,
    ngoId,
    donorId,
    pickupDate,
    notes
}) => {
    // Validate required fields
    if (!donationId || !ngoId || !donorId) {
        throw new Error('donationId, ngoId, and donorId are required');
    }

    // Check if donation already assigned
    const existingAssignment = await AssignedDonation.findOne({
        donationId,
        status: { $in: ['accepted', 'task_assigned', 'completed'] }
    });

    if (existingAssignment) {
        throw new Error('Donation already accepted by another NGO');
    }

    // Create assignment
    const assignment = await AssignedDonation.create({
        donationId,
        ngoId,
        donorId,
        status: 'accepted',
        acceptedAt: new Date(),
        pickupDate: pickupDate || null,
        notes: notes || ''
    });

    // Update donation status
    await Donation.findByIdAndUpdate(donationId, {
        status: 'approved'
    });

    return assignment;
};

module.exports.getAssignmentsByNgo = async (ngoId, status = null) => {
    // Validate NGO ID
    if (!ngoId) {
        throw new Error('NGO ID is required');
    }

    // Build query
    let query = { ngoId };

    // Add status filter if provided
    if (status) {
        query.status = status;
    }

    // Fetch assignments with populated data
    const assignments = await AssignedDonation.find(query)
        .populate('donationId')  // Get donation details
        .populate('donorId', 'fullname email address phone')  // Get donor details
        .populate('ngoId', 'fullname email')  // Get NGO details
        .sort({ acceptedAt: -1 });  // Most recent first

    return assignments;
};

/* ================= GET ASSIGNMENT BY ID ================= */
module.exports.getAssignmentById = async (assignmentId) => {
    if (!assignmentId) {
        throw new Error('Assignment ID is required');
    }

    const assignment = await AssignedDonation.findById(assignmentId)
        .populate('donationId')
        .populate('donorId', 'fullname email address phone')
        .populate('ngoId', 'fullname email');

    if (!assignment) {
        throw new Error('Assignment not found');
    }

    return assignment;
};