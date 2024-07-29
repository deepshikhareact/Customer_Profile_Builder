const express = require("express");
const router = express.Router();
const User = require("../models/User_Customer");
const Verify_User = require("../models/Verify_User_Customer");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Subscription_Manager = require("../models/Subscription_manager");
const FormsManager = require("../models/Form_manager_model");
const {
  generateEmailVerification,
  generateForgotPasswordEmail,
} = require("../utils/email_template");
const saltRounds = 10;
require("dotenv").config();

const { add_freeTrail_Subscription } = require("../utils/create_subscription");

const encodeKey = process.env.ENCODE_KEY;
const user_mail_address = process.env.MAIL_ADDRESS;
const user_mail_password = process.env.Mail_PASS;
const login_Token_Vaildity = process.env.LOGIN_TOKEN_VAILDITY;

router.post("/login", async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ phoneNumber: id }, { email: id }],
    });

    if (!user) {
      return res.status(200).json({
        success: false,
        data: "User not found. Please sign up to create an account.",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(200).json({
        success: false,
        data: "Incorrect password. Please verify your password and try again.",
      });
    }
    delete user.password;

    const token = jwt.sign(
      { user: { _id: user._id, email: user.email } },
      encodeKey,
      {
        expiresIn: login_Token_Vaildity,
      }
    );

    res.status(200).json({ success: true, data: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: "An error occurred: " + error.message });
  }
});

router.post("/createAccount", async (req, res) => {
  const payload = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
    });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        data: "Phone number or email is already registered. Please login",
      });
    }

    // Hash the password before saving the user account
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Update the payload with the hashed password
    payload.password = hashedPassword;

    const createAccount = new User(payload);
    const user = await createAccount.save();

    delete user.password;

    const token = jwt.sign(
      { user: { _id: user._id, email: user.email } },
      encodeKey,
      {
        expiresIn: login_Token_Vaildity,
      }
    );

    res.json({ success: true, data: user, token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, data: "An error occurred: " + error.message });
  }
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }, { _id: 1, email: 1 });

    if (!user) {
      return res.status(200).json({
        success: false,
        data: "Email not found. Please register",
      });
    }
    const token = jwt.sign({ user }, encodeKey, {
      expiresIn: "10m",
    });

    const url = `${process.env.CLIENT_URL}forgot_password/${token}`;
    const message = `Your token will expire in 10 minutes. Please complete the necessary actions within this time frame.
     \n\n
    Please click on the link below to reset your password \n\n ${url}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user_mail_address,
        pass: user_mail_password,
      },
    });

    // Set up email data
    let mailOptions = {
      from: user_mail_address,
      to: email,
      subject: "Forgot Password",
      html: generateForgotPasswordEmail(url),
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    res.status(200).json({ data: "Email sent successfully", success: true });
  } catch (error) {
    console.error(error?.message);
    res
      .status(500)
      .json({ data: error.message || "Failed to send email", success: false });
  }
});

router.post("/sendCodeToEmail", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const payload = req.body;
    const existingUser = await User.findOne({
      $or: [{ phoneNumber }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        data: "Email or Phone Number is already registered. Please login",
      });
    }

    // Hash the password before saving the user account
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Update the payload with the hashed password
    function generateRandomCode() {
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var code = "";

      for (var i = 0; i < 6; i++) {
        code += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return code;
    }

    const token = generateRandomCode();
    payload.password = hashedPassword;
    payload.code = token;

    const createAccount = new Verify_User(payload);
    await createAccount.save();

    const message = `Your verification code is: \n\n ${token} \n\n Please use this code to verify your email address.`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user_mail_address,
        pass: user_mail_password,
      },
    });

    // Set up email data
    let mailOptions = {
      from: user_mail_address,
      to: email,
      subject: "Email Verification",
      text: message,
      html: generateEmailVerification(token),
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    res.status(200).json({ data: "Email sent successfully", success: true });
  } catch (error) {
    console.error(error?.message);
    res
      .status(500)
      .json({ data: error.message || "Failed to send email", success: false });
  }
});

router.post("/confirmVerifyEmail", async (req, res) => {
  try {
    const { code, email } = req.body;
    if (!code || !email) {
      return res
        .status(400)
        .json({ data: "Code and Email are required", success: false });
    }

    const verifyCode = await Verify_User.findOne({ email });
    if (!verifyCode || verifyCode.code !== code) {
      return res.status(200).json({ data: "Incorrect Code ", success: false });
    }

    const payload = {
      firstName: verifyCode.firstName,
      lastName: verifyCode.lastName,
      email: verifyCode.email,
      password: verifyCode.password,
      phoneNumber: verifyCode.phoneNumber,
      country: verifyCode.country,
      state: verifyCode.state,
      city: verifyCode.city,
      pinCode: verifyCode.pinCode,
      industrySegment: verifyCode.industrySegment,
      organization: verifyCode.organization,
      organization_SubCategory: verifyCode.organization_SubCategory,
    };

    const user = new User(payload);
    const manager = new Subscription_Manager({ author: user._id });
    const forms_manager = new FormsManager({ author: user._id, forms: [] });

    await forms_manager.save();
    user.subscription_Manager = manager._id;
    user.forms_manager = forms_manager._id;
    await user.save();
    await manager.save();

    await add_freeTrail_Subscription(user);

    await Verify_User.deleteOne({ _id: verifyCode._id });

    delete user.password;

    const token = jwt.sign(
      { user: { _id: user._id, email: user.email } },
      encodeKey,
      {
        expiresIn: login_Token_Vaildity,
      }
    );

    res.json({ success: true, data: user, token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      data: error.message || "Failed to verify token",
      success: false,
    });
  }
});

router.post("/forgotpassword/:token", async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!password) {
      return res
        .status(200)
        .json({ data: "Password is required", success: false });
    }
    const decoded = jwt.verify(token, encodeKey);

    if (decoded.error) {
      return res.status(200).json({ data: "Token is invalid", success: false });
    }

    const user = await User.findById(decoded.user._id);

    if (!user) {
      return res.status(404).json({ data: "User not found", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      data: "Password updated successfully, Login with new Password !!!",
      success: true,
    });
  } catch (error) {
    console.error(error?.message);
    res.status(500).json({
      data: error.message || "Failed to verify token",
      success: false,
    });
  }
});

module.exports = router;
