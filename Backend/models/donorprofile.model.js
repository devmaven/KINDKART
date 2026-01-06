const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    itemType: {
      type: String,
      enum: ['books', 'clothes', 'food', 'cycles'],
      required: true
    },

    quantity: {
      type: Number,
      min: 1,
      required: true
    },

    condition: {
      type: String,
      enum: ['new', 'used', 'perishable'],
      required: true
    },

    deliveryOption: {
      type: String,
      enum: ['pickup', 'drop-off'],
      required: true
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'picked_up', 'delivered'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
