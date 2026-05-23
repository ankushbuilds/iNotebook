const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017/myDatabase"; // include your DB name

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB succesfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = connectToMongoDB;