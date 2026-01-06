const mongoose = require('mongoose');

const systemLogSchema = new mongoose.Schema(
  {
    type: {
      type: String
    },
    message: {
      type: String
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  {
    timestamps: true
  }
);

const SystemLog = mongoose.model('SystemLog', systemLogSchema);

module.exports = SystemLog;
