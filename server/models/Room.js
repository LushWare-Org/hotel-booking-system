const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxCount: { type: Number, required: true },
    rentPerDay: { type: Number, required: true },
    imageUrls: { type: [String], required: true },
    phoneNumber: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    currentBookings: { type: [Object], default: [] },
});

module.exports = mongoose.model('Room', roomSchema);
