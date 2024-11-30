const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['email', 'sms'],
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('notifications', notificationSchema);
