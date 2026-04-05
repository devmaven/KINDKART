// models/task.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AssignedDonation',  // Links to AssignedDonation
        required: true
    },
    donationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    type: {
        type: String,
        enum: ['Pickup', 'Delivery'],
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['assigned', 'accepted', 'in_transit', 'delivered'],
        default: 'assigned'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Volunteer
        required: true
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // NGO
        required: true
    },
    acceptedAt: Date,
    startedAt: Date,
    completedAt: Date,
    notes: String,
    completionProof: String
}, { timestamps: true });

// Auto-generate taskId
taskSchema.pre('save', async function () {
    if (!this.taskId) {
        const Task = mongoose.model('Task');
        const count = await Task.countDocuments();
        this.taskId = `TSK${String(count + 1).padStart(3, '0')}`;
    }
});

const TaskModel= mongoose.model('Task', taskSchema);

module.exports = TaskModel;
