const taskService = require('../services/task.service');
const Task = require('../models/task.model');
const User = require('../models/user.model');

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