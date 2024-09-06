const express = require("express");
const router = express();
const User = require("../model/User");
const Availability = require("../model/availability");

router.post("/availability", async (req, res) => {
    const { email, start, end, duration } = req.body;

    // validation =============
    if (!email) {
        res.json({ message: "please enter email" });
    } else if (!start) {
        res.json({ message: "please enter start time" })
    } else if (!end) {
        res.json({ message: "please enter end time" })
    } else if (!duration) {
        res.json({ message: "please enter duration" })
    } else {

        try {
            const checkuser = await User.findOne({ email });
            if (!checkuser) return res.json({ message: "please login first" })

            const userId = checkuser._id;
            const created = await Availability.create({ userId: userId, start, end, duration });

            if (created) {
                res.status(200).json({ message: "availability added successfully", data: created });
            } else {
                res.status(401).json({ message: "failed please try again" });
            }
        } catch (error) {
            res.json({ message: error.message });
        }
    }
})

module.exports = router;