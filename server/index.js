const express = require('express');
const { connectDB } = require('./config/db');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
// const listingRoutes = require('./routes/listingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/listings', listingRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});