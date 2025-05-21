const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const otpStore = {};


const registerUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });
  console.log(user);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });


  const otp = crypto.randomInt(100000, 999999).toString();

  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };


  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "INFINITY OS Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; border:1px solid #e0e0e0; border-radius:8px; padding:32px 24px; background:#fafbfc;">
        <h2 style="color:#1e3a8a; margin-bottom:16px;">INFINITY OS Password Reset</h2>
        <p style="font-size:16px; color:#333;">
          Hello <b>${user.name}</b>,
        </p>
        <p style="font-size:16px; color:#333;">
          We received a request to reset your password. Please use the OTP below to proceed:
        </p>
        <div style="text-align:center; margin:32px 0;">
          <span style="display:inline-block; font-size:32px; letter-spacing:8px; color:#1e3a8a; font-weight:bold; background:#e0e7ff; padding:16px 32px; border-radius:8px;">
            ${otp}
          </span>
        </div>
        <p style="font-size:15px; color:#555;">
          This OTP is valid for <b>5 minutes</b>. If you did not request a password reset, please ignore this email.
        </p>
        <hr style="margin:32px 0 16px 0; border:none; border-top:1px solid #e0e0e0;">
        <p style="font-size:13px; color:#aaa; text-align:center;">
          &copy; ${new Date().getFullYear()} INFINITY OS. All rights reserved.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP email." });
  }
};


const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (record && record.otp === otp && Date.now() < record.expires) {
    delete otpStore[email]; 
    return res.json({ message: "OTP verified!" });
  }
  res.status(400).json({ error: "Invalid or expired OTP." });
};


const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error during password reset" });
  }
};


const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { name, email, phone, profilePicture } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ error: "Server error during profile update" });
  }
};
const getUserData = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching users data" });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { _id } = req.params;
    const { role } = req.body;

    if (!_id || !role) {
      return res.status(400).json({ error: "User ID and new role are required" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Server error while changing user role" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateProfile,
  getUserData,
  changeUserRole
};
