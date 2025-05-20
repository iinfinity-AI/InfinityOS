import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../../assets/Admin/LoginImage.jpg";
import API from "../../services/api.js";
import { toast, ToastContainer } from "react-toastify";


export default function LoginPage() {
  const [form, setForm] = useState({ 
    email: "", 
    password: "", 
    remember: false 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail, remember: true }));
    }
    
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (form.remember) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Login successful!");

      setTimeout(() => {
        switch(user.role) {
          case "Admin":
            navigate("/admin/dashboard");
            window.location.reload();
            break;
          case "team-lead":
            navigate("/team-lead/dashboard");
            window.location.reload();
            break;
          default:
<<<<<<< HEAD
            navigate("/user/dashboard");
=======
            navigate("/employee/dashboard");
            window.location.reload();
>>>>>>> newFrontend
        }
      }, 1000);


    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
      toast.error(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ToastContainer position="top-center" />

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-blue-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1">
              Login to your INFINITY OS account
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              autoComplete="current-password"
              minLength="6"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <Link
              to="/reset-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition flex justify-center items-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : "Sign in"}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 h-full bg-cover bg-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LoginImage})` }}
        ></div>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex flex-col justify-center items-start px-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug max-w-lg mb-6">
            Manage all <span className="text-yellow-400">HR Operations</span> from the comfort of your home.
          </h2>
          <p className="text-lg max-w-md mb-8">
            Streamline your HR processes with our comprehensive employee management platform.
          </p>
          <div className="flex gap-3">
            <span className="w-6 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-6 h-2 rounded-full bg-white opacity-30"></span>
            <span className="w-6 h-2 rounded-full bg-white opacity-30"></span>
          </div>
        </div>
      </div>
    </div>
  );
}