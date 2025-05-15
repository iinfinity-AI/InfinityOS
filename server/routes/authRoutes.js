const express = require("express");
const { registerUser, loginUser, sendOtp, verifyOtp, resetPassword,updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middilware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.put("/profile", authMiddleware,updateProfile)
module.exports = router;
