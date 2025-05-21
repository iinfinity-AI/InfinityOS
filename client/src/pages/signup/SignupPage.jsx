import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/Admin/RegisterImage.jpg";
import API from "../../services/api.js";
import { toast, ToastContainer } from "react-toastify";


export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(form.phone)) newErrors.phone = "Invalid phone";
    if (!form.password || form.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (!form.terms) newErrors.terms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const finalData = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      const res = await API.post("/register", finalData);
      if (res.status === 201) {
        toast.success("Signup successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {

      const apiMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "";

      if (
        apiMsg.toLowerCase().includes("email already exists") ||
        apiMsg.toLowerCase().includes("duplicate")
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
        toast.error("This email is already registered.");
      } else {
        toast.error(apiMsg || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ToastContainer position="top-center" />
      <div
        className="w-1/2 h-full relative bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${RegisterImage})` }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-80 flex flex-col items-start justify-center px-20">
          <h1 className="text-4xl font-bold mb-4">Employee Management Platform</h1>
          <p className="text-lg mb-6 max-w-md">
            Manage all employees, payrolls, and other human resource operations.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <form onSubmit={handleSignup} className="w-full max-w-xl space-y-6">
          <h2 className="text-3xl font-bold text-blue-900">Welcome to INFINITY OS</h2>
          <p className="text-gray-500 mb-6">Register your account</p>

          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 border rounded"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 border rounded"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-mail Address"
                className="w-full p-3 border rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            />
            <label className="text-sm text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
          >
            Create Account
          </button>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-700 font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}