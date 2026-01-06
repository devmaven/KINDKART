const mongoose = require('mongoose');

const volunteerTaskSchema = new mongoose.Schema(
  {
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true
    },

    status: {
      type: String,
      enum: ['assigned', 'collected', 'in_transit', 'delivered'],
      default: 'assigned'
    }
  },
  {
    timestamps: true
  }
);

const VolunteerTask = mongoose.model('VolunteerTask', volunteerTaskSchema);

module.exports = VolunteerTask;
