const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    from_date: {
        type: Date,  
        required: true
    },
    to_date: {
        type: Date,  
        required: true
    },
    total_days: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Booked"
    }
}, {
    timestamps: true,
});

const bookingModel = mongoose.model('Booking', bookingSchema); 

module.exports = bookingModel;
