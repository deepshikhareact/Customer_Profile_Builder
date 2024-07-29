const express = require("express");
const router = express.Router();
const FormsManager = require("../models/Form_manager_model");
const User = require("../models/User_Customer");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, { _id: 1 });

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }
    const myFormData = await FormsManager.findOne({ author: user._id }).lean();

    res.status(200).json({ data: myFormData, success: true });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

router.get("/create_new", async (req, res) => {
  try {
    const user_id = req.user;
    const user = await User.findById(user_id, { _id: 1 });

    if (!user) {
      return res.status(200).json({ data: "User Not Found", success: false });
    }

    const form_id = new mongoose.Types.ObjectId();

    res.status(200).json({ data: form_id, success: true });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ data: error.message, success: false });
  }
});

module.exports = router;
