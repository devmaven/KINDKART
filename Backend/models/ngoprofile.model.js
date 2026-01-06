const mongoose = require('mongoose');

const ngoProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    registrationNumber: {
      type: String,
      required: true
    },

    serviceArea: {
      type: String,
      required: true
    },

    documents: [String],

    isVerified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const NgoProfile = mongoose.model('NgoProfile', ngoProfileSchema);

module.exports = NgoProfile;
