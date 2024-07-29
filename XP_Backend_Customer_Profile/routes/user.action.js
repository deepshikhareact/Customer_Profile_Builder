const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const Insight = require("../models/Form_manager_model");
// Get all users
router.get("/", async (req, res) => {
  try {
    // const users = await User.find().lean().exec();
    res.json({ data: "GET ALL USERS", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId, {
      firstName: 1,
      lastName: 1,
      email: 1,
      phoneNumber: 1,
      status: 1,
      country: 1,
      state: 1,
      city: 1,
      pinCode: 1,
      organization: 1,
      organization_SubCategory: 1,
      industrySegment: 1,
      active_subscription: 1,
    })
      .populate({
        path: "active_subscription",
        select: "endTime plan price startTime",
      })
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ data: user, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

module.exports = router;
