const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport'); 
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const bodyParser = require("body-parser");
const contactRoutes = require('./routes/contactRoutes'); 

const app = express();
app.use(bodyParser.json());
app.use('/api/contact', contactRoutes);

// Use CORS for cross-origin requests
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware to parse JSON data
app.use(express.json());

// Enable session for passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/notifications', notificationRoutes); 

// Connect to MongoDB
mongoose.connect('mongodb+srv://harithmadu:myhoteldb@cluster0.klue1z8.mongodb.net/hotel-booking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connect successful'))
  .catch((err) => console.error('DB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
