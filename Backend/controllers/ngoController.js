
const User = require('../models/user.model');
const Donation = require('../models/donorprofile.model');
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
                donationId: donation._id,
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
        console.log('sdsdsds', ngoId, )

        const requests = await receiverRequestService.getRequestsByNgo(ngoId, status);
            console.log('tyt', requests)
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

/* ================= NGO: APPROVE/REJECT RECEIVER REQUEST ================= */
module.exports.assignTaskFromRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { volunteerId, scheduledDate, notes } = req.body;
        const ngoId = req.user._id;
      

        const task = await taskService.createTaskFromRequest({
            requestId,
            volunteerId,
            scheduledDate,
            assignedBy: ngoId,
            notes
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