const express = require("express");
const { registerUser, loginUser, sendOtp, verifyOtp, resetPassword,updateProfile,getUserData } = require("../controllers/authController");
const authMiddleware = require("../middilware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.put("/profile", authMiddleware,updateProfile)
router.get("/users", authMiddleware,getUserData)

module.exports = router;
