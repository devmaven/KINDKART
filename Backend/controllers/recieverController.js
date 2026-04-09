// controllers/receiver.controller.js
const receiverRequestService = require('../services/recieverRequest.service');
const assignmentService = require('../services/assignedDonation.service');
const ReceiverRequest = require('../models/recieverRequest.model')
const AssignedDonation = require('../models/assignedDonation.model')
const Task = require('../models/task.model')

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

/* ================= GET RECEIVER STATISTICS ================= */
module.exports.getReceiverStatistics = async (req, res) => {
    try {
        const receiverId = req.user._id;

        // Get all requests made by this receiver
        const allRequests = await ReceiverRequest.find({ receiverId: receiverId })
            .populate('donationId assignmentId');

        // Get all tasks delivered to this receiver (through assignments)
        const allAssignments = await AssignedDonation.find({
            receiverId: receiverId,
            status: 'completed'
        }).populate('donationId');

        // Calculate request statistics
        const activeRequests = allRequests.filter(r =>
            r.status === 'pending' || r.status === 'approved'
        ).length;

        const pendingApprovals = allRequests.filter(r =>
            r.status === 'pending'
        ).length;

        const approvedRequests = allRequests.filter(r =>
            r.status === 'approved'
        ).length;

        const rejectedRequests = allRequests.filter(r =>
            r.status === 'rejected'
        ).length;

        const completedRequests = allRequests.filter(r =>
            r.status === 'completed'
        ).length;

        // Calculate items received (from completed assignments)
        let totalItemsReceived = 0;
        const itemsReceivedList = [];

        allAssignments.forEach(assignment => {
            if (assignment.donationId) {
                const quantity = assignment.donationId.quantity || 0;
                totalItemsReceived += quantity;
                itemsReceivedList.push({
                    itemType: assignment.donationId.itemType,
                    quantity: quantity,
                    receivedAt: assignment.deliveryDate || assignment.updatedAt
                });
            }
        });

        // Also check tasks delivered directly
        const deliveredTasks = await Task.find({
            receiverId: receiverId,
            status: 'delivered'
        }).populate('donationId');

        deliveredTasks.forEach(task => {
            if (task.donationId) {
                totalItemsReceived += task.donationId.quantity || 0;
                itemsReceivedList.push({
                    itemType: task.donationId.itemType,
                    quantity: task.donationId.quantity,
                    receivedAt: task.completedAt
                });
            }
        });

        // Get items by category
        const itemsByCategory = {
            books: 0,
            clothes: 0,
            cycles: 0
        };

        itemsReceivedList.forEach(item => {
            if (itemsByCategory.hasOwnProperty(item.itemType)) {
                itemsByCategory[item.itemType] += item.quantity;
            }
        });

        // Calculate donation value (if you have value field)
        const totalValueReceived = totalItemsReceived * 100; // Example: 100 per item

        // Get recent activity (last 5 requests)
        const recentRequests = await ReceiverRequest.find({ receiverId: receiverId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('donationId', 'itemType quantity')
            .select('status message requestedAt respondedAt');

        // Calculate trends (last 30 days)
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const requestsLast30Days = allRequests.filter(r =>
            new Date(r.createdAt) >= last30Days
        ).length;

        const itemsReceivedLast30Days = itemsReceivedList.filter(item =>
            new Date(item.receivedAt) >= last30Days
        ).reduce((sum, item) => sum + item.quantity, 0);

        // Calculate approval rate
        const approvalRate = allRequests.length > 0
            ? ((approvedRequests + completedRequests) / allRequests.length * 100).toFixed(1)
            : 0;

        // Prepare response
        const stats = {
            // Request statistics
            totalRequests: allRequests.length,
            activeRequests: activeRequests,
            pendingApprovals: pendingApprovals,
            approvedRequests: approvedRequests,
            rejectedRequests: rejectedRequests,
            completedRequests: completedRequests,

            // Items received
            totalItemsReceived: totalItemsReceived,
            itemsByCategory: itemsByCategory,
            totalValueReceived: totalValueReceived,

            // Recent activity
            recentRequests: recentRequests.map(r => ({
                itemType: r.donationId?.itemType,
                quantity: r.donationId?.quantity,
                status: r.status,
                message: r.message,
                requestedAt: r.requestedAt,
                respondedAt: r.respondedAt
            })),

            // Trends
            requestsLast30Days: requestsLast30Days,
            itemsReceivedLast30Days: itemsReceivedLast30Days,

            // Rates
            approvalRate: parseFloat(approvalRate),

            // Impact
            impactScore: totalItemsReceived * 5, // Example: 5 points per item received

            // Recent items received
            recentItems: itemsReceivedList.slice(-5).reverse()
        };

        res.status(200).json({
            success: true,
            statistics: stats
        });

    } catch (error) {
        console.error('Error in getReceiverStatistics:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};