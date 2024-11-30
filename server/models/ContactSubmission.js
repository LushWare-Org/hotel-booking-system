const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  reply: {
    subject: { type: String },
    message: { type: String },
    sentAt: { type: Date },
  },
});

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

module.exports = ContactSubmission;
