const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {console.log("MongoDB connected")});
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
   
};
module.exports = connectDB;