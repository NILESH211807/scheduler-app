const mongoose = require("mongoose");

const availabilitySchema = mongoose.Schema({
    userId: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    duration: { type: String, required: true }
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;