// services/activityLog.service.js
const ActivityLog = require('../models/activityLog.model');

module.exports.logActivity = async ({
    userId,
    userRole,
    action,
    entityType,
    entityId,
    status,
    details = {},
    req = null
}) => {
    try {
        const logData = {
            userId,
            userRole,
            action,
            entityType,
            entityId,
            status,
            details
        };

        // Add request info if available
        if (req) {
            logData.ipAddress = req.ip || req.connection?.remoteAddress;
            logData.userAgent = req.headers['user-agent'];
        }

        const activityLog = await ActivityLog.create(logData);
        return activityLog;
    } catch (error) {
        console.error('Error logging activity:', error);
        // Don't throw error - activity logging should not break main flow
    }
};

module.exports.getUserActivities = async (userId, limit = 50, offset = 0) => {
    const activities = await ActivityLog.find({ userId })
        .sort({ timestamp: -1 })
        .skip(offset)
        .limit(limit);

    const total = await ActivityLog.countDocuments({ userId });

    return { activities, total };
};

module.exports.getEntityActivities = async (entityType, entityId, limit = 50) => {
    const activities = await ActivityLog.find({ entityType, entityId })
        .populate('userId', 'fullname email role')
        .sort({ timestamp: -1 })
        .limit(limit);

    return activities;
};

module.exports.getRecentActivities = async (limit = 100) => {
    const activities = await ActivityLog.find()
        .populate('userId', 'fullname email role')
        .sort({ timestamp: -1 })
        .limit(limit);

    return activities;
};

module.exports.getTaskTimeline = async (taskId) => {
    const activities = await ActivityLog.find({
        entityType: 'task',
        entityId: taskId
    }).sort({ timestamp: 1 });

    return activities;
};