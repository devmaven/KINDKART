const dotenv = require('dotenv');
dotenv.config({ override: true });
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const authRoutes = require('./routes/authRoutes')
// const donationRoutes = require('./routes/donationRoutes');
const adminRoutes = require('./routes/adminRoutes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/',(req, res) => { 
    res.send('Hello World');
});

app.use('/auth',authRoutes);
// app.use('/donations',donationRoutes);
// app.use('/admins',adminRoutes);
module.exports = app;
