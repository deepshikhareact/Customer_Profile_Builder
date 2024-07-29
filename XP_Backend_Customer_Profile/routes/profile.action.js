const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const Profile = require("../models/Profile");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, { _id: 1, profiles: 1 })
      .populate("profiles")
      .lean();

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, { _id: 1 });

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    const payload = req.body;
    const id = new mongoose.Types.ObjectId();
    const newProfile = new Profile({
      author: user._id,
      title: `${id}`,
      data: payload,
    });
    await newProfile.save();
    const updateUser = await User.findByIdAndUpdate(user._id, {
      $push: { profiles: newProfile._id },
    });

    res.status(200).json({ data: newProfile, success: true });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
