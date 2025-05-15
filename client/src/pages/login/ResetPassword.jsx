import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await API.post('/send-otp', { email });
      setMessage('OTP sent to your email address.');
      toast.success('OTP sent to your email address.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP.');
      toast.error(err.response?.data?.error || 'Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await API.post('/verify-otp', { email, otp });
      setMessage('OTP verified! You can now reset your password.');
      toast.success('OTP verified! You can now reset your password.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
      toast.error(err.response?.data?.error || 'Invalid OTP. Please try again.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    try {
      await API.post('/reset-password', { email, newPassword });
      setMessage('Password changed successfully! You can now log in.');
      toast.success('Password changed successfully! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password.');
      toast.error(err.response?.data?.error || 'Failed to reset password.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Password Reset</h2>
        {message && <p className="mb-4 text-blue-600">{message}</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}
        {step === 1 && (
          <>
            <p className="text-gray-600 mb-6">
              Provide the email address associated with your account to recover your password.
            </p>
            <form onSubmit={handleReset}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-gray-600 mb-6">
              Enter the 6-digit OTP sent to your email.
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
              >
                Verify OTP
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
                onClick={async () => {
                  setError('');
                  setMessage('');
                  try {
                    await API.post('/send-otp', { email });
                    setMessage('OTP resent to your email address.');
                    toast.success('OTP resent to your email address.');
                  } catch (err) {
                    setError(err.response?.data?.error || 'Failed to resend OTP.');
                    toast.error(err.response?.data?.error || 'Failed to resend OTP.');
                  }
                }}
              >
                Resend OTP
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <p className="text-gray-600 mb-6">
              Enter your new password below.
            </p>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200"
              >
                Change Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
