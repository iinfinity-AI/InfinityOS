import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import API from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { UploadImage } from '../../services/uploadImage.js';
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const imageUrl = await UploadImage(file);
      setUserData(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));
      toast.success('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload profile picture');
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

      // Update local storage with new user data
      const updatedUser = {
        ...JSON.parse(localStorage.getItem('user')),
        ...response.data.user
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to the previous page
  const goBack = () => {
    navigate(-1);  // Use navigate with -1 to go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-center" />
      <div className="max-w-3xl mx-auto pt-10">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-10 text-center relative">
            <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
              {userData.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-200 flex items-center justify-center text-5xl text-blue-700 font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all">
                  <label className="cursor-pointer flex flex-col items-center">
                    <FaCamera className="text-white text-2xl mb-1" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                    />
                    <span className="text-white text-xs font-medium">
                      {imageUploading ? 'Uploading...' : 'Change Photo'}
                    </span>
                  </label>
                </div>
              )}
            </div>
            <h1 className="mt-6 text-3xl font-extrabold text-white drop-shadow-lg">{userData.name}</h1>
            <p className="text-blue-200 text-lg font-medium">{userData.role}</p>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-10">
            <button
              onClick={goBack} // Go back when the button is clicked
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
            >
              Back
            </button>

            {!isEditing ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Full Name</p>
                      <p className="mt-1 text-gray-900 text-lg">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Email address</p>
                      <p className="mt-1 text-gray-900 text-lg">{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Phone</p>
                      <p className="mt-1 text-gray-900 text-lg">{userData.phone || <span className="italic text-gray-400">Not provided</span>}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Edit Profile</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-blue-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-blue-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-blue-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-blue-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-blue-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-blue-200 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-75"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-6 py-3 border border-blue-200 text-base font-semibold rounded-lg shadow-sm text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
