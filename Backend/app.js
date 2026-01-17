const dotenv = require('dotenv');
dotenv.config({ override: true });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const connectToDb = require('./db/db');
const authRoutes = require('./routes/authRoutes');
// const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Connect to database
connectToDb();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authRoutes);
// app.use('/donations', donationRoutes);
// app.use('/admins', adminRoutes);

module.exports = app;
