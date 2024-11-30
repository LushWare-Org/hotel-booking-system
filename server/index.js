const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const db = require('./db');

const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/rooms', roomRoutes);
app.use('/users', userRoutes);
app.use('/book', bookingRoutes);

const port = process.env.port || 3000;
app.listen(port, ()=>console.log(`Server running on ${port}`));