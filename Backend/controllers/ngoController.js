
const User = require('../models/user.model');
const Donation = require('../models/donorprofile.model');
const AssignedDonation = require('../models/assignedDonation.model');
const Task = require('../models/task.model');
const ReceiverRequest = require('../models/recieverRequest.model');
const AssignmentService = require('../services/assignedDonation.service')
const receiverRequestService = require('../services/recieverRequest.service'); // Add this
const taskService = require('../services/task.service'); // Add this

/* ================= GET ALL DONATIONS WITH DONOR NAME AND ADDRESS ================= */
module.exports.getAllDonationsWithDonorDetails = async (req, res) => {
    try {
        // Fetch all donations and populate donor details
        const donations = await Donation.find()
            .populate('donorId', 'fullname email address role') // Get donor details from User model
            .sort({ createdAt: -1 }); // Most recent first


        if (!donations || donations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No donations found'
            });
        }

        // Format the response with donor name and address
        const formattedDonations = donations.map(donation => {
            // Extract donor name
            const donorName = donation.donorId?.fullname
                ? `${donation.donorId.fullname.firstname} ${donation.donorId.fullname.lastname || ''}`.trim()
                : 'Unknown Donor';

            return {
                _id: donation._id,
                donationId: donation.donationId,
                itemType: donation.itemType,
                quantity: donation.quantity,
                condition: donation.condition,
                deliveryOption: donation.deliveryOption,
                status: donation.status,
                createdAt: donation.createdAt,
                updatedAt: donation.updatedAt,
                donor: {
                    id: donation.donorId?._id,
                    name: donorName,
                    email: donation.donorId?.email || 'Not available',
                    address: donation.donorId?.address || 'Address not provided',
                    role: donation.donorId?.role
                }
            };
        });

        // Calculate statistics
        const stats = {
            totalDonations: donations.length,
            totalItems: donations.reduce((sum, donation) => sum + donation.quantity, 0),
            byItemType: {
                books: donations.filter(d => d.itemType === 'books').length,
                clothes: donations.filter(d => d.itemType === 'clothes').length,
                cycles: donations.filter(d => d.itemType === 'cycles').length
            },
            byStatus: {
                pending: donations.filter(d => d.status === 'pending').length,
                approved: donations.filter(d => d.status === 'approved').length,
                picked_up: donations.filter(d => d.status === 'picked_up').length,
                delivered: donations.filter(d => d.status === 'delivered').length
            }
        };

        res.status(200).json({
            success: true,
            statistics: stats,
            donations: formattedDonations
        });

    } catch (error) {
        console.error('Error fetching donations with donor details:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports.ngoAcceptDonation = async (req, res) => {
    try {
        const { donationId } = req.params;
        const { pickupDate, notes } = req.body;
        const ngoId = req.user._id;

        // Get donation to get donorId

        const donation = await Donation.findById(donationId);

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        // Create assignment using service
        const assignment = await AssignmentService.createAssignment({
            donationId,
            ngoId,
            donorId: donation.donorId,
            pickupDate,
            notes
        });

        res.status(201).json({
            success: true,
            message: 'Donation accepted successfully',
            data: assignment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getReceiverRequests = async (req, res) => {
    try {
        const ngoId = req.user._id;
        const { status } = req.query; // pending, approved, rejected


        const requests = await receiverRequestService.getRequestsByNgo(ngoId, status);

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


/* ================= NGO: APPROVE/REJECT RECEIVER REQUEST ================= */
module.exports.respondToRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status, responseMessage } = req.body; // 'approved' or 'rejected'

        const request = await receiverRequestService.updateRequestStatus(
            requestId,
            status,
            responseMessage
        );

        res.status(200).json({
            success: true,
            message: `Request ${status} successfully`,
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

/* ================= NGO: ASSIGN TASK FROM REQUEST ================= */
module.exports.assignTaskFromRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { volunteerId, scheduledDate, notes, priority } = req.body;
        const ngoId = req.user._id;

        // Validate priority if provided
        const validPriorities = ['high', 'medium', 'low'];
        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({
                success: false,
                message: `Invalid priority. Allowed values: ${validPriorities.join(', ')}`
            });
        }

        const task = await taskService.createTaskFromRequest({
            requestId,
            volunteerId,
            scheduledDate,
            assignedBy: ngoId,
            notes,
            priority: priority || 'medium' // Default to 'medium' if not provided
        });

        res.status(201).json({
            success: true,
            message: 'Task assigned to volunteer successfully',
            data: task
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* ================= NGO: GET ALL VOLUNTEERS ================= */
module.exports.getVolunteers = async (req, res) => {
    try {
        const ngoId = req.user._id;

        // Get all volunteers (users with role 'volunteer')
        const volunteers = await User.find({ role: 'volunteer' })
            .select('fullname email phone address')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: volunteers.length,
            data: volunteers
        });

    } catch (error) {
        console.error('Error in getVolunteers:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* ================= GET NGO STATISTICS ================= */
module.exports.getNgoStatistics = async (req, res) => {
    try {
        const ngoId = req.user._id;

        // Get all assignments (donations accepted by this NGO)
        const allAssignments = await AssignedDonation.find({ ngoId: ngoId })
            .populate('donationId')
            .populate('donorId', 'fullname address');

        // Get all tasks assigned by this NGO
        const allTasks = await Task.find({ assignedBy: ngoId })
            .populate('donationId')
            .populate('assignedTo', 'fullname email phone')
            .populate('assignedBy', 'fullname');

        // Get all receiver requests for this NGO
        const allRequests = await ReceiverRequest.find({ ngoId: ngoId })
            .populate('receiverId', 'fullname email address phone')
            .populate('donationId');

        // Get unique volunteers
        const uniqueVolunteerIds = [...new Set(allTasks.map(t => t.assignedTo?._id?.toString()).filter(Boolean))];
        const totalVolunteers = uniqueVolunteerIds.length;

        // Get unique receivers
        const uniqueReceiverIds = [...new Set(allRequests.map(r => r.receiverId?._id?.toString()).filter(Boolean))];
        const totalReceivers = uniqueReceiverIds.length;

        // ============ DONATION STATS ============
        const pendingDonations = allAssignments.filter(a => a.status === 'accepted').length;
        const donationsInProgress = allAssignments.filter(a =>
            a.status === 'task_assigned' || a.status === 'picked_up'
        ).length;
        const completedDonations = allAssignments.filter(a =>
            a.status === 'completed' || a.status === 'delivered'
        ).length;
        const totalDonationsAccepted = allAssignments.length;

        // ============ ITEM DISTRIBUTION STATS ============
        let totalItemsDistributed = 0;
        let itemsByCategory = {
            books: 0,
            clothes: 0,
            cycles: 0
        };



        // Store distribution details for recent activity
        const distributionDetails = [];

        for (const assignment of allAssignments) {
            if (assignment.status === 'completed' && assignment.donationId) {

                // Get receiver name for this specific assignment
                const receiverRequest = await ReceiverRequest.findOne({
                    assignmentId: assignment._id,
                    status: 'completed'
                }).populate('receiverId', 'fullname');

                const receiverName = receiverRequest?.receiverId
                    ? `${receiverRequest.receiverId.fullname.firstname} ${receiverRequest.receiverId.fullname.lastname || ''}`
                    : 'Unknown';

                const quantity = assignment.donationId.quantity || 0;
                const itemType = assignment.donationId.itemType;

                totalItemsDistributed += quantity;

                if (itemsByCategory.hasOwnProperty(itemType)) {
                    itemsByCategory[itemType] += quantity;
                }

                // Add to distribution details
                distributionDetails.push({
                    type: 'assignment',
                    itemType: itemType,
                    quantity: quantity,
                    receiverName: receiverName,
                    deliveredAt: assignment.deliveryDate || assignment.updatedAt,
                    status: assignment.status,
                    donationId: assignment.donationId._id
                });
            }
        }




        // Also check completed tasks
        const completedTasks = allTasks.filter(t => t.status === 'delivered');
        completedTasks.forEach(task => {
            if (task.donationId) {
                const quantity = task.donationId.quantity || 0;
                const itemType = task.donationId.itemType;

                totalItemsDistributed += quantity;

                if (itemsByCategory.hasOwnProperty(itemType)) {
                    itemsByCategory[itemType] += quantity;
                }

                // Add to distribution details
                distributionDetails.push({
                    type: 'task',
                    itemType: itemType,
                    quantity: quantity,
                    volunteerName: task.assignedTo ? `${task.assignedTo.fullname.firstname} ${task.assignedTo.fullname.lastname || ''}` : 'Unknown',
                    deliveredAt: task.completedAt,
                    status: task.status,
                    taskId: task.taskId
                });
            }
        });

        // Sort distribution by date (most recent first)
        distributionDetails.sort((a, b) => new Date(b.deliveredAt) - new Date(a.deliveredAt));

        // ============ REQUEST STATS ============
        const pendingRequests = allRequests.filter(r => r.status === 'pending').length;
        const approvedRequests = allRequests.filter(r => r.status === 'approved').length;
        const rejectedRequests = allRequests.filter(r => r.status === 'rejected').length;
        const completedRequests = allRequests.filter(r => r.status === 'completed').length;
        const totalRequests = allRequests.length;

        // ============ TASK STATS ============
        const totalTasks = allTasks.length;
        const tasksAssigned = allTasks.filter(t => t.status === 'assigned').length;
        const tasksInProgress = allTasks.filter(t => t.status === 'in_transit').length;
        const tasksCompleted = allTasks.filter(t => t.status === 'delivered').length;
        const tasksCancelled = allTasks.filter(t => t.status === 'cancelled').length;

        // ============ VOLUNTEER PERFORMANCE ============
        const volunteerPerformance = [];
        for (const volunteerId of uniqueVolunteerIds) {
            const volunteerTasks = allTasks.filter(t => t.assignedTo?._id?.toString() === volunteerId);
            const completed = volunteerTasks.filter(t => t.status === 'delivered').length;
            const total = volunteerTasks.length;

            if (volunteerId) {
                const volunteer = await User.findById(volunteerId).select('fullname email');
                if (volunteer) {
                    volunteerPerformance.push({
                        volunteerId: volunteer._id,
                        name: `${volunteer.fullname.firstname} ${volunteer.fullname.lastname || ''}`,
                        email: volunteer.email,
                        totalTasks: total,
                        completedTasks: completed,
                        completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
                    });
                }
            }
        }
        volunteerPerformance.sort((a, b) => b.completionRate - a.completionRate);

        // ============ RECENT ACTIVITY ============

        // Recent requests (last 5)
        const recentRequests = await ReceiverRequest.find({ ngoId: ngoId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('receiverId', 'fullname')
            .populate('donationId', 'itemType quantity');

        // Recent tasks (last 5)
        const recentTasks = await Task.find({ assignedBy: ngoId })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('assignedTo', 'fullname')
            .populate('donationId', 'itemType quantity');

        // Recent distributions (last 5)
        const recentDistributions = distributionDetails.slice(0, 5);

        // ============ TRENDS (Last 30 Days) ============
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const donationsLast30Days = allAssignments.filter(a =>
            new Date(a.createdAt) >= last30Days
        ).length;

        const itemsDistributedLast30Days = allAssignments.filter(a =>
            a.status === 'completed' && new Date(a.updatedAt) >= last30Days
        ).reduce((sum, a) => sum + (a.donationId?.quantity || 0), 0);

        const requestsLast30Days = allRequests.filter(r =>
            new Date(r.createdAt) >= last30Days
        ).length;

        // ============ RESPONSE ============

        const stats = {
            // Donation stats
            donations: {
                totalAccepted: totalDonationsAccepted,
                pending: pendingDonations,
                inProgress: donationsInProgress,
                completed: completedDonations,
                donationsLast30Days: donationsLast30Days
            },

            // Item distribution
            itemsDistributed: {
                total: totalItemsDistributed,
                byCategory: itemsByCategory,
                last30Days: itemsDistributedLast30Days
            },

            // Volunteer stats
            volunteers: {
                total: totalVolunteers,
                active: volunteerPerformance.filter(v => v.completedTasks > 0).length,
                topPerformers: volunteerPerformance.slice(0, 5)
            },

            // Receiver stats
            receivers: {
                total: totalReceivers,
                active: uniqueReceiverIds.length,
                pendingRequests: pendingRequests,
                approvedRequests: approvedRequests,
                rejectedRequests: rejectedRequests,
                completedRequests: completedRequests
            },

            // Request stats
            requests: {
                total: totalRequests,
                pending: pendingRequests,
                approved: approvedRequests,
                rejected: rejectedRequests,
                completed: completedRequests,
                requestsLast30Days: requestsLast30Days,
                approvalRate: totalRequests > 0
                    ? ((approvedRequests + completedRequests) / totalRequests * 100).toFixed(1)
                    : 0
            },

            // Task stats
            tasks: {
                total: totalTasks,
                assigned: tasksAssigned,
                inProgress: tasksInProgress,
                completed: tasksCompleted,
                cancelled: tasksCancelled,
                completionRate: totalTasks > 0
                    ? ((tasksCompleted / totalTasks) * 100).toFixed(1)
                    : 0
            },

            // Recent activity
            recentActivity: {
                recentRequests: recentRequests.map(r => ({
                    receiverName: r.receiverId ? `${r.receiverId.fullname.firstname} ${r.receiverId.fullname.lastname || ''}` : 'Unknown',
                    itemType: r.donationId?.itemType,
                    quantity: r.donationId?.quantity,
                    status: r.status,
                    requestedAt: r.requestedAt
                })),
                recentTasks: recentTasks.map(t => ({
                    volunteerName: t.assignedTo ? `${t.assignedTo.fullname.firstname} ${t.assignedTo.fullname.lastname || ''}` : 'Unknown',
                    itemType: t.donationId?.itemType,
                    quantity: t.donationId?.quantity,
                    status: t.status,
                    scheduledDate: t.scheduledDate
                })),
                recentDistributions: recentDistributions.map(d => ({
                    itemType: d.itemType,
                    quantity: d.quantity,
                    deliveredTo: d.receiverName || d.volunteerName,
                    deliveredBy: d.type === 'task' ? d.volunteerName : 'NGO',
                    deliveredAt: d.deliveredAt,
                    type: d.type
                }))
            },


            // Impact score
            impactScore: {
                totalItemsDistributed: totalItemsDistributed,
                livesImpacted: totalItemsDistributed * 2,
                volunteersEngaged: totalVolunteers,
                receiversServed: totalReceivers
            }
        };

        res.status(200).json({
            success: true,
            statistics: stats
        });

    } catch (error) {
        console.error('Error in getNgoStatistics:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};