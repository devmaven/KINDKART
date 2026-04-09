const taskService = require('../services/task.service');
const Task = require('../models/task.model');
const User = require('../models/user.model');
const activityLogService = require('../services/acitvityLog.service');
const AssignedDonation = require('../models/assignedDonation.model');
const Donation = require('../models/donorprofile.model');
const ReceiverRequest = require('../models/recieverRequest.model');
const ActivityLog = require('../models/activityLog.model');

/* ================= GET ALL TASKS FOR VOLUNTEER ================= */
module.exports.getMyTasks = async (req, res) => {
    try {
        const volunteerId = req.user._id;
        const { status, priority, sortBy = 'scheduledDate' } = req.query;

        // Build query
        let query = { assignedTo: volunteerId };
        if (status) query.status = status;
        if (priority) query.priority = priority;

        // Build sort object
        let sort = {};
        if (sortBy === 'scheduledDate') sort = { scheduledDate: 1 };
        if (sortBy === 'priority') sort = { priority: -1 };
        if (sortBy === 'createdAt') sort = { createdAt: -1 };

        const tasks = await Task.find(query)
            .populate('assignedBy', 'fullname email phone')
            .populate('donationId')
            .sort(sort);

        // Format tasks for display
        const formattedTasks = tasks.map(task => ({
            _id:task._id,
            taskId: task.taskId,
            type: task.type,
            itemName: task.itemName,
            quantity: task.quantity,
            location: task.location,
            scheduledDate: task.scheduledDate,
            priority: task.priority,
            status: task.status,
            notes: task.notes,
            ngo: task.assignedBy ? {
                name: `${task.assignedBy.fullname.firstname} ${task.assignedBy.fullname.lastname || ''}`,
                phone: task.assignedBy.phone
            } : null,
            timestamps: {
                acceptedAt: task.acceptedAt,
                startedAt: task.startedAt,
                completedAt: task.completedAt
            }
        }));

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: formattedTasks
        });

    } catch (error) {
        console.error('Error in getMyTasks:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= VOLUNTEER UPDATE TASK STATUS ================= */
module.exports.updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const volunteerId = req.user._id;
        const volunteerRole = req.user.role;

        // Validate status
        const validStatuses = ['accepted', 'in_transit', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Allowed statuses: ${validStatuses.join(', ')}`
            });
        }

        // Find task assigned to this volunteer
        const task = await Task.findOne({
            taskId: taskId,
            assignedTo: volunteerId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or not assigned to you'
            });
        }

        // Check if task is already completed or cancelled
        if (task.status === 'delivered' || task.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: `Task is already ${task.status}. Cannot update status.`
            });
        }

        // Validate status flow
        if (status === 'accepted' && task.status !== 'assigned') {
            return res.status(400).json({
                success: false,
                message: 'Task must be in "assigned" status to accept'
            });
        }

        if (status === 'in_transit' && task.status !== 'accepted') {
            return res.status(400).json({
                success: false,
                message: 'Task must be "accepted" before starting transit'
            });
        }

        if (status === 'delivered' && task.status !== 'in_transit') {
            return res.status(400).json({
                success: false,
                message: 'Task must be "in_transit" before marking delivered'
            });
        }

        // Update task based on status
        switch (status) {
            case 'accepted':
                task.status = 'accepted';
                task.acceptedAt = new Date();

                // Log activity
                await ActivityLog.create({
                    userId: volunteerId,
                    userRole: volunteerRole,
                    action: 'TASK_ACCEPTED',
                    entityType: 'task',
                    entityId: task._id,
                    status: 'accepted',
                    details: {
                        taskId: task.taskId,
                        itemName: task.itemName,
                        quantity: task.quantity
                    },
                    timestamp: new Date()
                });
                break;

            case 'in_transit':
                task.status = 'in_transit';
                task.startedAt = new Date();

                // Log activity
                await ActivityLog.create({
                    userId: volunteerId,
                    userRole: volunteerRole,
                    action: 'TASK_STARTED',
                    entityType: 'task',
                    entityId: task._id,
                    status: 'in_transit',
                    details: {
                        taskId: task.taskId,
                        itemName: task.itemName,
                        quantity: task.quantity,
                        location: task.location
                    },
                    timestamp: new Date()
                });
                break;

            case 'delivered':
                task.status = 'delivered';
                task.completedAt = new Date();

                // Update related records
                await AssignedDonation.findByIdAndUpdate(task.assignmentId, {
                    status: 'completed',
                    deliveryDate: new Date()
                });

                await Donation.findByIdAndUpdate(task.donationId, {
                    status: 'delivered'
                });

                // Update receiver request if exists
                if (task.requestId) {
                    await ReceiverRequest.findByIdAndUpdate(task.requestId, {
                        status: 'completed'
                    });
                }

                // Log activity
                await ActivityLog.create({
                    userId: volunteerId,
                    userRole: volunteerRole,
                    action: 'TASK_COMPLETED',
                    entityType: 'task',
                    entityId: task._id,
                    status: 'delivered',
                    details: {
                        taskId: task.taskId,
                        itemName: task.itemName,
                        quantity: task.quantity,
                        pointsEarned: 15
                    },
                    timestamp: new Date()
                });
                break;

            case 'cancelled':
                task.status = 'cancelled';
                task.cancelledAt = new Date();
                task.cancellationReason = 'Cancelled by volunteer';

                // Update assignment back to available
                await AssignedDonation.findByIdAndUpdate(task.assignmentId, {
                    status: 'accepted'
                });

                // Log activity
                await ActivityLog.create({
                    userId: volunteerId,
                    userRole: volunteerRole,
                    action: 'TASK_CANCELLED',
                    entityType: 'task',
                    entityId: task._id,
                    status: 'cancelled',
                    details: {
                        taskId: task.taskId,
                        itemName: task.itemName,
                        quantity: task.quantity,
                        reason: 'Cancelled by volunteer'
                    },
                    timestamp: new Date()
                });
                break;
        }

        await task.save();

        // Prepare response message
        let message = '';
        switch (status) {
            case 'accepted':
                message = 'Task accepted successfully!';
                break;
            case 'in_transit':
                message = 'Task is now in transit!';
                break;
            case 'delivered':
                message = 'Task delivered successfully! Thank you for your service.';
                break;
            case 'cancelled':
                message = 'Task cancelled successfully.';
                break;
        }

        res.status(200).json({
            success: true,
            message: message,
            data: {
                taskId: task.taskId,
                status: task.status
            }
        });

    } catch (error) {
        console.error('Error in updateTaskStatus:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= GET VOLUNTEER ACTIVITY LOG ================= */
module.exports.getMyActivityLog = async (req, res) => {
    try {
        const volunteerId = req.user._id;
        const { limit = 50, offset = 0 } = req.query;

        const { activities, total } = await activityLogService.getUserActivities(
            volunteerId,
            parseInt(limit),
            parseInt(offset)
        );

        res.status(200).json({
            success: true,
            total,
            limit: parseInt(limit),
            offset: parseInt(offset),
            data: activities
        });

    } catch (error) {
        console.error('Error in getMyActivityLog:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


/* ================= GET VOLUNTEER STATISTICS WITH LEVEL SYSTEM ================= */
module.exports.getVolunteerStatistics = async (req, res) => {
    try {
        const volunteerId = req.user._id;

        // Get all tasks for this volunteer
        const allTasks = await Task.find({ assignedTo: volunteerId });

        // Calculate basic stats
        const totalTasksAssigned = allTasks.length;
        const totalTasksCompleted = allTasks.filter(t => t.status === 'delivered').length;
        const totalTasksInTransit = allTasks.filter(t => t.status === 'in_transit').length;
        const totalTasksAccepted = allTasks.filter(t => t.status === 'accepted').length;
        const totalTasksCancelled = allTasks.filter(t => t.status === 'cancelled').length;

        // Calculate points (15 points per completed task)
        const POINTS_PER_DELIVERY = 15;
        const totalPoints = totalTasksCompleted * POINTS_PER_DELIVERY;

        // Level system (each level = 50 points)
        const POINTS_PER_LEVEL = 50;
        const currentLevel = Math.floor(totalPoints / POINTS_PER_LEVEL) + 1;

        // Calculate next milestone
        const currentLevelPoints = totalPoints % POINTS_PER_LEVEL;
        const pointsNeededForNextLevel = POINTS_PER_LEVEL - currentLevelPoints;
        const nextLevel = currentLevel + 1;

        // Calculate completion rate
        const completionRate = totalTasksAssigned > 0
            ? ((totalTasksCompleted / totalTasksAssigned) * 100).toFixed(1)
            : 0;

        // Get recent tasks
        const recentTasks = await Task.find({ assignedTo: volunteerId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('taskId itemName quantity status completedAt createdAt');

        const stats = {
            // Task counts
            totalTasksAssigned,
            totalTasksCompleted,
            totalTasksInTransit,
            totalTasksAccepted,
            totalTasksCancelled,

            // Points
            totalPoints,
            pointsPerDelivery: POINTS_PER_DELIVERY,

            // Level system
            level: currentLevel,
            nextLevel: nextLevel,
            pointsInCurrentLevel: currentLevelPoints,
            pointsNeededForNextLevel: pointsNeededForNextLevel,

            // Progress percentage to next level
            progressToNextLevel: ((currentLevelPoints / POINTS_PER_LEVEL) * 100).toFixed(0),

            // Level milestones
            levelMilestones: {
                level1: 50,
                level2: 100,
                level3: 150,
                level4: 200,
                level5: 250,
                level6: 300,
                level7: 350,
                level8: 400,
                level9: 450,
                level10: 500
            },

            // Other stats
            completionRate: parseFloat(completionRate),

            // Recent tasks
            recentTasks: recentTasks.map(task => ({
                taskId: task.taskId,
                itemName: task.itemName,
                quantity: task.quantity,
                status: task.status,
                completedAt: task.completedAt,
                pointsEarned: task.status === 'delivered' ? POINTS_PER_DELIVERY : 0
            }))
        };

        res.status(200).json({
            success: true,
            statistics: stats
        });

    } catch (error) {
        console.error('Error in getVolunteerStatistics:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};