const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, 'Invalid phone number']
    },

    address: {
      type: String
    },

    role: {
      type: String,
      enum: ['donor', 'ngo', 'volunteer', 'receiver', 'admin'],
      required: true
    },

    loginAttempts: {
      type: Number,
      default: 0
    },

    isLocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
