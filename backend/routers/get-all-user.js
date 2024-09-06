const express = require("express");
const User = require("../model/User");
const router = express();


router.get('/get-all-user', async (req, res) => {
    try {
        const useData = await User.find();
        if (useData) {
            res.json({ message: "success", data: useData });
        } else {
            res.status(401).json({ message: "failed please try again" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
})


module.exports = router;