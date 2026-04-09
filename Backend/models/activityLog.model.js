// models/activityLog.model.js
const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userRole: {
        type: String,
        enum: ['volunteer', 'ngo', 'donor', 'receiver', 'admin'],
        required: true
    },
    action: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        enum: ['task', 'donation', 'assignment', 'request', 'user'],
        required: true
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: String,
    userAgent: String
}, { timestamps: true });

// Indexes for better query performance
activityLogSchema.index({ userId: 1, timestamp: -1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ action: 1, timestamp: -1 });

const ActivityLog = mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;