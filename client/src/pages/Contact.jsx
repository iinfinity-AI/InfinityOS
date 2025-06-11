import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import ContactBg from "../../src/assets/homepage/HomeBack.jpg";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheck,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

// Replace with your actual EmailJS credentials
const serviceID = "service_x5ydxfr";
const templateID = "template_i6bi3w4";
const userID = "ovLpuGbawHqA6cPwh";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const validateForm = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
      formIsValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      formIsValid = false;
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
      formIsValid = false;
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFocus = (name) => {
    setActiveInput(name);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSending(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || "InfinityOS Contact Form",
      message: formData.message,
      to_email: "udayangakasun696@gmail.com",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSending(false);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setErrors({
          submit: "Failed to send message. Please try again later.",
        });
        setSending(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${ContactBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-blue-900/70 to-indigo-900/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions about InfinityOS? We're here to help you find the
            perfect solution for your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/20 h-full">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-900/70 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-blue-300 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Our Office
                    </h3>
                    <p className="text-blue-100">
                      12/2B, Sudarshana Road, Off Hill street, Dehiwala
                    </p>
                    <p className="text-blue-100">Colombo, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-900/70 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-blue-300 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Call Us</h3>
                    <p className="text-blue-100">+94 77 763 7964</p>
                    <p className="text-blue-100">Mon-Fri, 9am-6pm PST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-900/70 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-blue-300 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-blue-100">contact@iinfinityai.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="font-semibold text-white mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-blue-900/70 p-3 rounded-full text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-900/70 p-3 rounded-full text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-900/70 p-3 rounded-full text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-blue-300">
                Send Us a Message
              </h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/60 border border-green-400 text-green-100 px-6 py-4 rounded-lg mb-6 flex items-center"
                >
                  <FaCheck className="w-5 h-5 mr-3 text-green-400" />
                  <span>
                    Thank you for your message! We'll get back to you shortly.
                  </span>
                </motion.div>
              )}

              {errors.submit && (
                <div className="bg-red-900/60 border border-red-400 text-red-100 px-6 py-4 rounded-lg mb-6">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      disabled={sending}
                      className={`w-full bg-white/20 border ${
                        errors.name
                          ? "border-red-400"
                          : activeInput === "name"
                          ? "border-blue-400"
                          : "border-white/30"
                      } rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Your Name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      disabled={sending}
                      className={`w-full bg-white/20 border ${
                        errors.email
                          ? "border-red-400"
                          : activeInput === "email"
                          ? "border-blue-400"
                          : "border-white/30"
                      } rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Your Email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="mb-6">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={handleBlur}
                    disabled={sending}
                    className={`w-full bg-white/20 border ${
                      activeInput === "subject"
                        ? "border-blue-400"
                        : "border-white/30"
                    } rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Subject (Optional)"
                  />
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    disabled={sending}
                    className={`w-full bg-white/20 border ${
                      errors.message
                        ? "border-red-400"
                        : activeInput === "message"
                        ? "border-blue-400"
                        : "border-white/30"
                    } rounded-lg px-4 py-3 text-white placeholder-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    placeholder="Your Message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg flex items-center justify-center transition-all ${
                    sending ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {sending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-blue-300">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">
                How quickly can we implement InfinityOS?
              </h3>
              <p className="text-blue-100">
                Most organizations are up and running within 2-4 weeks,
                depending on your specific requirements and integration needs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">
                Is InfinityOS suitable for small businesses?
              </h3>
              <p className="text-blue-100">
                Absolutely! We offer scalable plans starting from as few as 10
                employees, with all the core features you need to manage your
                team effectively.
              </p>
            </div>

            <div className="bg-white/10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">
                Can InfinityOS integrate with our existing HR software?
              </h3>
              <p className="text-blue-100">
                Yes, we offer integrations with most popular HR, payroll, and
                productivity platforms. Our team can help determine the best
                integration approach for your needs.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
