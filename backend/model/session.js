const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    userId: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    attendees: [{
        name: { type: String, default: "siri" },
        email: { type: String, required: true }
    }],
    type: { type: String, default: 'one-on-one' },
});

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
