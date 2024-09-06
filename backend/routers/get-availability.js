const express = require("express");
const User = require("../model/User");
const router = express();
const Availability = require("../model/availability");

router.post("/get-availability", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.json({ message: "please select email" });
    const checkuser = await User.findOne({ email });
    if (!checkuser) return res.json({ message: "please login again" });
    const userid = checkuser._id;

    const availabilitys = await Availability.find({ userId: userid });
    if (!availabilitys) return res.json({ message: "availabilitys not found" })
    res.json({ message: "success", data: availabilitys });
})

module.exports = router;