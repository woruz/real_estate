const express = require('express');
const cors = require('cors')
const { connectDB } = require('./config/db');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const favouriteRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/users', favouriteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});