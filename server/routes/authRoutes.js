const express = require("express");
const { registerUser, loginUser, sendOtp, verifyOtp, resetPassword,updateProfile,getUserData, changeUserRole } = require("../controllers/authController");
const protect = require("../middilware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.put("/profile", protect,updateProfile)
router.get("/users", protect,getUserData)
router.patch("/admin/dashboard/changeRole/:_id", protect,changeUserRole)

module.exports = router;
