// controllers/receiver.controller.js
const receiverRequestService = require('../services/recieverRequest.service');
const assignmentService = require('../services/assignedDonation.service');

/* ================= RECEIVER: VIEW AVAILABLE DONATIONS ================= */
module.exports.getAvailableDonations = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const {ngoId} = req.params
        console.log('sas', receiverId)


        // Get all accepted donations that are not yet requested/approved
        const assignments = await assignmentService.getAssignmentsByNgo(ngoId, 'accepted');

        // Filter out donations already requested by this receiver
        const userRequests = await receiverRequestService.getRequestsByReceiver(receiverId);
        const requestedAssignmentIds = userRequests.map(r => r.assignmentId.toString());

        const availableDonations = assignments.filter(
            a => !requestedAssignmentIds.includes(a._id.toString())
        );

        res.status(200).json({
            success: true,
            count: availableDonations.length,
            data: availableDonations
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= RECEIVER: REQUEST DONATION ================= */
module.exports.requestDonation = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { message } = req.body;
        const receiverId = req.user._id;

        // Get assignment details
        const assignment = await assignmentService.getAssignmentById(assignmentId);
       
        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        // Create request
        const request = await receiverRequestService.createRequest({
            assignmentId: assignment._id,
            receiverId: receiverId,
            ngoId: assignment.ngoId._id,
            donationId: assignment.donationId._id,
            message: message
        });

        res.status(201).json({
            success: true,
            message: 'Request sent to NGO successfully',
            data: request
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= RECEIVER: VIEW MY REQUESTS ================= */
module.exports.getMyRequests = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const { status } = req.query;

        const requests = await receiverRequestService.getRequestsByReceiver(receiverId, status);

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};