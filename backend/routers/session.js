const express = require("express");
const User = require("../model/User");
const Session = require("../model/session");
const router = express();

router.post("/session", async (req, res) => {
    const { email, start, end } = req.body;
    // validation 
    if (!email) {
        res.json({ message: "please enter email" });
    } else if (!start) {
        res.json({ message: "please enter start time" })
    } else if (!end) {
        res.json({ message: "please enter end time" })
    } else {

        try {
            const checkuser = await User.findOne({ email })
            const userId = checkuser._id;
            const emailId = checkuser.email;

            const created = await Session.create(
                {
                    userId: userId, start, end, attendees: [
                        { email: emailId },
                    ]
                });


            if (created) {
                res.status(200).json({ message: "session schedule successfully", data: created });
            }
            else {
                res.status(401).json({ message: "failed please try again" });
            }
        } catch (error) {
            res.json({ message: error.message });
        }
    }

})

module.exports = router;



