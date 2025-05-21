import React, { useState } from "react";
import emailjs from "emailjs-com";
import ContactBg from "../../src/assets/homepage/HomeBack.jpg"; // use your blurred background image

const serviceID = "service_x5ydxfr";
const templateID = "template_i6bi3w4";
const userID = "ovLpuGbawHqA6cPwh";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      email: formData.name,
      name: formData.email,
      message: formData.message,
      to_email: "udayangakasun696@gmail.com",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setSending(false);
      })
      .catch((error) => {
        alert("Failed to send message. Please try again later.");
        console.error("EmailJS error:", error);
        setSending(false);
      });
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${ContactBg})` }}
      ></div>

      {/* Form Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow">
          Contact INFINITYOS EMS
        </h1>

        {submitted && (
          <div className="bg-green-100 text-green-800 border border-green-400 px-6 py-4 rounded mb-6 text-center font-semibold shadow-lg">
            Thank you for contacting us! We will get back to you shortly.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md text-gray-900 p-10 rounded-2xl shadow-2xl"
          noValidate
        >
          {/* Name Field */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={sending}
              required
              placeholder=" "
              className="block px-4 pt-6 pb-2 w-full text-base text-[#0A4D88] bg-white/80 border border-[#0A4D88]/30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4D88] focus:border-transparent peer placeholder:text-[#0A4D88]/60"
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#0A4D88]"
            >
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={sending}
              required
              placeholder=" "
              className="block px-4 pt-6 pb-2 w-full text-base text-[#0A4D88] bg-white/80 border border-[#0A4D88]/30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4D88] focus:border-transparent peer placeholder:text-[#0A4D88]/60"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#0A4D88]"
            >
              Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              disabled={sending}
              required
              placeholder=" "
              className="block px-4 pt-6 pb-2 w-full text-base text-[#0A4D88] bg-white/80 border border-[#0A4D88]/30 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4D88] focus:border-transparent peer resize-y placeholder:text-[#0A4D88]/60"
            />
            <label
              htmlFor="message"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 left-4 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#0A4D88]"
            >
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={sending}
            className={`flex items-center justify-center gap-2 w-full bg-[#0A4D88] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 ${
              sending ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black"
            }`}
          >
            {sending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
