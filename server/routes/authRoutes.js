const express = require("express");
const { registerUser, loginUser, sendOtp, verifyOtp, resetPassword,updateProfile,getUserData, changeUserRole,deleteUser } = require("../controllers/authController");
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
router.delete("/admin/dashboard/changeRole/:userId", protect, deleteUser);

module.exports = router;
