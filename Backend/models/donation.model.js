const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
      donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

    ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

    volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

    itemType: {
    type: String,
    enum: ['books', 'clothes', 'food', 'cycles'],
    required: true
  },

    quantity: {
    type: Number,
    required: true
  },

    condition: {
    type: String,
    enum: ['new', 'used', 'perishable'],
    required: true
  },

    pickupType: {
    type: String,
    enum: ['pickup', 'drop'],
    required: true
  },

    address: {
    type: String,
    required: true
  },

    status: {
    type: String,
    enum: ['pending', 'approved', 'assigned', 'picked', 'delivered'],
    default: 'pending'
  }
},

  { timestamps: true });

  module.exports = mongoose.models.Donation || mongoose.model('Donation', donationSchema);
