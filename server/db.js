const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection URI
const uri = 'mongodb+srv://harithmadu:myhoteldb@cluster0.klue1z8.mongodb.net/hotel-booking';

// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(uri); 
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
  }
}

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
