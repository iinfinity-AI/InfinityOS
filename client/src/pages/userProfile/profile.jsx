import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { UploadImage } from '../../services/uploadImage.js';
import { FaCamera, FaTimes } from "react-icons/fa";
import HomeBack from '../../assets/homepage/HomeBack.jpg';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    profilePicture: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        role: parsedUser.role || '',
        profilePicture: parsedUser.profilePicture || ''
      });
    }
  }, []);

  const goBack = () => navigate(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const imageUrl = await UploadImage(file);
      setUserData(prev => ({ ...prev, profilePicture: imageUrl }));
      toast.success('Profile picture updated', {
        className: 'bg-[#0f172a] text-white font-medium rounded-md shadow-md'
      });
    } catch {
      toast.error('Image upload failed', {
        className: 'bg-red-600 text-white font-medium rounded-md shadow-md'
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.put('/profile', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        profilePicture: userData.profilePicture
      });
      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user')),
        ...response.data.user
      }));
      toast.success('Profile updated successfully', {
        className: 'bg-[#0f172a] text-white font-medium rounded-md shadow-md'
      });
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Update failed', {
        className: 'bg-red-600 text-white font-medium rounded-md shadow-md'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">

      {/* Background with blur and dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${HomeBack})` }}
      ></div>

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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white bg-opacity-90 backdrop-blur-md text-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">

          {/* Close Button */}
          <button
            onClick={goBack}
            className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-2xl"
          >
            <FaTimes />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer">
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
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
            </div>
          </div>

          {/* Form or Info */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex space-x-4 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Full Name</span>
                  <span>{userData.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Email</span>
                  <span>{userData.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Mobile</span>
                  <span>{userData.phone || 'Add number'}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
