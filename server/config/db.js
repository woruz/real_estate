const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = { connectDB };