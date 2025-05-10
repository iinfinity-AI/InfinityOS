import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
  
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Password Reset</h2>
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
      </div>
    </div>
  );
};

export default ResetPassword;
