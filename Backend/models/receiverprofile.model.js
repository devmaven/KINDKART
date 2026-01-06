const mongoose = require('mongoose');

const receiverRequestSchema = new mongoose.Schema(
  {
    receiverId: {
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

    status: {
      type: String,
      enum: ['requested', 'allocated', 'received'],
      default: 'requested'
    }
  },
  {
    timestamps: true
  }
);

const ReceiverRequest = mongoose.model('ReceiverRequest', receiverRequestSchema);

module.exports = ReceiverRequest;
