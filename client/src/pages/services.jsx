import React, { useState, useEffect } from "react";
import ServicesBg from "../../src/assets/homepage/HomeBack.jpg";
import { motion } from "framer-motion";
import { FaArrowRight, FaHeadset, FaUsers } from "react-icons/fa";

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  // Animation to reveal items as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById("services-grid");
      if (servicesSection) {
        const sectionTop = servicesSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          const allServices = services.map((service) => service.id);
          setVisibleItems(allServices);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 500);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (id) => {
    setActiveCard((prev) => (prev === id ? null : id)); // toggle
  };

  const services = [
    {
      id: 1,
      title: "Attendance & Leave Management",
      description:
        "Track employee attendance, leave balances, and automate approvals with customizable workflows.",
      extra:
        "This module enables managers to monitor working hours and ensures compliance with company policies.",
      benefits: [
        "Real-time attendance tracking",
        "Automated leave approval workflows",
        "Time-off balance reports",
        "Holiday calendar management",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M8 7V3M16 7V3M3 11h18M5 11v10a2 2 0 002 2h10a2 2 0 002-2V11" />
        </svg>
      ),
      color: "from-blue-600 to-blue-400",
    },
    {
      id: 2,
      title: "Performance Reviews",
      description:
        "Set goals, evaluate employee performance, and provide feedback all within one platform.",
      extra:
        "Helps in identifying top talent, skill gaps, and improvement areas with structured review cycles.",
      benefits: [
        "360° feedback collection",
        "Goal tracking and achievements",
        "Performance metrics dashboards",
        "Development plan creation",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2 2 4-4" />
        </svg>
      ),
      color: "from-purple-600 to-purple-400",
    },
    {
      id: 3,
      title: "Payroll Integration",
      description:
        "Seamlessly manage payroll calculations and integrate with popular payroll services.",
      extra:
        "Automates tax deductions, payment schedules, and compliance reports integrated with HR records.",
      benefits: [
        "Automated salary processing",
        "Tax compliance management",
        "Integration with banking systems",
        "Payment history and reporting",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M12 1v22M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
        </svg>
      ),
      color: "from-green-600 to-green-400",
    },
    {
      id: 4,
      title: "Employee Onboarding",
      description:
        "Streamline the new hire process with automated workflows and document management.",
      extra:
        "Ensures consistent onboarding experience with checklists, resource allocation, and progress tracking.",
      benefits: [
        "Digital document signing",
        "Automated welcome sequences",
        "Equipment provisioning",
        "Training assignment",
      ],
      icon: <FaUsers className="w-8 h-8 text-white" />,
      color: "from-yellow-500 to-yellow-300",
    },
    {
      id: 5,
      title: "Team Wellness",
      description:
        "Monitor and improve employee wellbeing with mood tracking, wellness programs, and resources.",
      extra:
        "Helps reduce burnout and improve team morale by identifying stress patterns and providing support resources.",
      benefits: [
        "Daily mood check-ins",
        "Wellness resource library",
        "Stress pattern identification",
        "Team-building activities",
      ],
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "from-red-500 to-pink-400",
    },
    {
      id: 6,
      title: "24/7 Support",
      description:
        "Access our dedicated support team whenever you need assistance with the platform.",
      extra:
        "Our technical experts are available around the clock to ensure your system runs smoothly at all times.",
      benefits: [
        "Live chat support",
        "Phone hotline",
        "Video troubleshooting",
        "Knowledge base access",
      ],
      icon: <FaHeadset className="w-8 h-8 text-white" />,
      color: "from-indigo-600 to-indigo-400",
    },
  ];

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-50"
          style={{ backgroundImage: `url(${ServicesBg})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/40 to-indigo-900/70 opacity-90"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Our Services
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl max-w-3xl mx-auto text-blue-100 mb-10">
              Comprehensive employee management solutions designed to streamline
              operations, boost productivity, and enhance workplace
              satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="relative z-10 py-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map(
              ({ id, title, description, extra, benefits, icon, color }) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    visibleItems.includes(id)
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.5, delay: (id - 1) * 0.1 }}
                  onClick={() => handleCardClick(id)}
                  className={`cursor-pointer bg-white/10 backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden 
                  shadow-xl transition-all duration-500 border border-white/20
                  ${
                    activeCard === id
                      ? "ring-4 ring-blue-400/70 scale-105"
                      : "hover:ring-2 hover:ring-blue-300/60"
                  }
                `}
                >
                  <div className={`h-2 bg-gradient-to-r ${color}`}></div>
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-3">
                      {title}
                    </h3>
                    <p className="text-blue-100 text-center leading-relaxed mb-4">
                      {description}
                    </p>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeCard === id ? "auto" : 0,
                        opacity: activeCard === id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-white/20">
                        <p className="text-gray-300 mb-4">{extra}</p>

                        <h4 className="font-semibold text-blue-300 mb-2">
                          Key Benefits:
                        </h4>
                        <ul className="space-y-2">
                          {benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-blue-400 mr-2 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              <span className="text-gray-200">{benefit}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          className={`mt-6 w-full py-2 px-4 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center font-medium transition-transform hover:scale-105`}
                        >
                          Learn More <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 bg-gradient-to-b from-indigo-900/80 to-gray-900/90">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Workplace?
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-3xl mx-auto">
              Get in touch with our team to discuss how InfinityOS can be
              tailored to your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Contact Us
              </a>
              <a
                href="/signup"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center"
              >
                Start With Us 

              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
