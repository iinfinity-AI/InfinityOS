import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { UploadImage } from "../../services/uploadImage.js";
import {
  FaCamera,
  FaTimes,
  FaEdit,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaUserTag,
} from "react-icons/fa";
import { motion } from "framer-motion";
import HomeBack from "../../assets/homepage/HomeBack.jpg";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        role: parsedUser.role || "",
        profilePicture: parsedUser.profilePicture || "",
      });
    }
  }, []);

  const goBack = () => navigate(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const imageUrl = await UploadImage(file);
      setUserData((prev) => ({ ...prev, profilePicture: imageUrl }));
      toast.success("Profile picture updated", {
        className:
          "bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium rounded-md shadow-lg",
      });
    } catch {
      toast.error("Image upload failed", {
        className:
          "bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-md shadow-lg",
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.put("/profile", {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profilePicture: userData.profilePicture,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          ...response.data.user,
        })
      );
      toast.success("Profile updated successfully", {
        className:
          "bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-medium rounded-md shadow-lg",
      });
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed", {
        className:
          "bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-md shadow-lg",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4">
      {/* Toast container with high z-index */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="!z-[9999]"
      />

      {/* Profile Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden height-full max-h-[90vh]">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
          {/* Close Button */}
          <button
            onClick={goBack}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          >
            <FaTimes />
          </button>
        </div>

        <div className="relative px-8 pb-8 -mt-16">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg z-10 mb-4">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl text-white font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer transition-all hover:bg-opacity-60">
                  <FaCamera className="text-white text-xl" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                  />
                </label>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h1>
            <p className="text-indigo-600 font-medium mt-1 capitalize">
              {userData.role}
            </p>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg text-sm flex items-center gap-2 transition-all"
              >
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>

          {/* Form or Info */}
          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-sm text-gray-700 bg-gray-50 p-6 rounded-xl"
            >
              <div>
                <label className="block font-medium mb-1 flex items-center gap-2">
                  <FaIdCard className="text-indigo-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-indigo-500" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 flex items-center gap-2">
                  <FaPhone className="text-indigo-500" /> Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="font-bold text-lg text-gray-800 mb-4">
                Profile Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center border-b border-gray-200 pb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                    <FaIdCard />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{userData.name}</p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                    <FaEnvelope />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 pb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                    <FaPhone />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {userData.phone || "No phone number added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
