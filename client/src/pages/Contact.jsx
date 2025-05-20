import React, { useState } from "react";
import emailjs from "emailjs-com";
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
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[#0A4D88] mb-10 text-center">
        Contact INFINITYOS EMS
      </h1>

      {submitted && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-8 text-center font-semibold shadow">
          Thank you for contacting us! We will get back to you shortly.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-10 rounded-2xl shadow-xl max-w-xl mx-auto"
        noValidate
      >
        {["name", "email"].map((field) => (
          <div key={field} className="relative z-0 w-full group">
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={sending}
              required
              placeholder=" "
              className="block py-3 px-4 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4D88] focus:border-transparent peer"
            />
            <label
              htmlFor={field}
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-4 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0A4D88] cursor-text"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}

        <div className="relative z-0 w-full group">
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            disabled={sending}
            required
            placeholder=" "
            className="block py-3 px-4 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#0A4D88] focus:border-transparent peer resize-y"
          />
          <label
            htmlFor="message"
            className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-4 z-10 origin-[0] bg-white px-1 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0A4D88] cursor-text"
          >
            Message
          </label>
        </div>

        <button
          type="submit"
          disabled={sending}
          className={`flex items-center justify-center gap-2 w-full bg-[#0A4D88] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-300 ${
            sending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-yellow-400 hover:text-black"
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
  );
};

export default Contact;
