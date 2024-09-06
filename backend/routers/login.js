const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.route('/login').post(async (req, res) => {
    const { email } = req.body;
    // email validation 
    if (!email) return res
        .status(401)
        .json({ message: "please enter email" });

    const checkuser = await User.findOne({ email });
    // if user already exist 
    if (checkuser) {
        res.status(200).json({ message: "login successfully", data: checkuser });
        return;
    }

    const created = await User.create({ email });
    if (created) {
        res.status(200).json({ message: "login successfully", data: created });
    } else {
        res.status(401).json({ message: "failed please try again" });
    }
})


module.exports = router;