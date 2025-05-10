import React, { useState } from "react";
import { useNavigate,Link  } from "react-router-dom";
import LoginImage from "../../assets/Admin/LoginImage.jpg";
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======

>>>>>>> 01b593ae1d9ffb47e9daa1419c9d1633fd462de5

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authService.login({
        email: form.email,
        password: form.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Login</h2>
            <p className="text-gray-500 text-sm mt-1">Login to your account.</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">E-mail Address</label>
            <input
              type="email"
              className="w-full border p-3 rounded"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-3 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            
          <Link to="/reset-password" className="text-blue-700 hover:underline">
            Forgot Password?
          </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
          >
            Login
          </button>

          <div className="text-center text-sm text-gray-700">
            Don’t have an account yet?{" "}
            <button
              type="button"
              className="text-blue-700 font-medium hover:underline"
              onClick={() => navigate("/signup")}
            >
              Join INFINITY OS today.
            </button>
          </div>
        </form>
      </div>

      <div
        className="w-1/2 h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex flex-col justify-center items-start px-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug max-w-lg mb-6">
            Manage all <span className="text-yellow-400">HR Operations</span> from the comfort of your home.
          </h2>
          <div className="flex gap-3 mt-10">
            <span className="w-6 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-6 h-2 rounded-full bg-white opacity-30"></span>
            <span className="w-6 h-2 rounded-full bg-white opacity-30"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
