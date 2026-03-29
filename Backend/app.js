// const dotenv = require('dotenv');
// dotenv.config({ override: true });
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const app = express();
// const connectToDb = require('./db/db');
// const authRoutes = require('./routes/authRoutes');
// // const donationRoutes = require('./routes/donationRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// // Connect to database
// connectToDb();

// // Middleware
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Routes
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.use('/auth', authRoutes);
// // app.use('/donations', donationRoutes);
// // app.use('/admins', adminRoutes);

// module.exports = app;

// const donorRoutes = require('./routes/donor.routes');

// app.use('/donor', donorRoutes);


const dotenv = require('dotenv');
dotenv.config({ override: true });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// DB
const connectToDb = require('./db/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes'); // ✅ UNCOMMENT THIS
const adminRoutes = require('./routes/adminRoutes');

// Connect to database
connectToDb();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // ✅ IMPORTANT
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/donor', donationRoutes);   // ✅ ADD THIS
app.use('/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

module.exports = app;