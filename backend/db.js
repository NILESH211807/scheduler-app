const mongoose = require("mongoose");
const database_connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://nileshkumar0815:I9fqsMIyN45YVgHf@cluster0.lnl1h.mongodb.net/availability-scheduler?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Database connection successful`);
    } catch (error) {
        console.log(`Database connection error: ${error.message}`);
    }
}

module.exports = database_connection;