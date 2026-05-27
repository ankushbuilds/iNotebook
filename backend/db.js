const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://ankushsingh2025_db_user:Ankush%402006@cluster0.gdobt77.mongodb.net/inotebook?retryWrites=true&w=majority"; // include your DB name

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB succesfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = connectToMongoDB;