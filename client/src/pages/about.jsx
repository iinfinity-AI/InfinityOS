import React, { useState, useEffect } from "react";
import AboutBackground from "../../src/assets/homepage/HomeBack.jpg";
import {
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";


const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const coreValues = [
    {
      icon: <FaShieldAlt className="w-10 h-10 text-blue-600" />,
      title: "Security",
      description:
        "Protecting sensitive employee information with top-tier encryption and compliance with global security standards.",
    },
    {
      icon: <FaUsers className="w-10 h-10 text-purple-600" />,
      title: "User-Centric",
      description:
        "Designing every feature with the end-user in mind, ensuring intuitive navigation and seamless experiences.",
    },
    {
      icon: <FaLightbulb className="w-10 h-10 text-yellow-500" />,
      title: "Innovation",
      description:
        "Continuously evolving our platform with cutting-edge technologies and forward-thinking solutions.",
    },
    {
      icon: <FaChartLine className="w-10 h-10 text-green-600" />,
      title: "Data-Driven",
      description:
        "Providing actionable insights and analytics to help organizations make informed decisions.",
    },
  ];

  const teamMembers = [
    {
      name: "Thinula Perera",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "Our vision is to revolutionize how companies manage their most valuable asset - their people.",
    },
    {
      name: "sandun perera",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "We're building technology that adapts to how people work, not the other way around.",
    },
    {
      name: "Sahan Perera",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      quote:
        "Every feature we develop solves a real problem faced by HR teams and managers.",
    },
  ];

  const stats = [
    {
      number: "5+",
      label: "Years Experience",
      icon: <FaClock className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "500+",
      label: "Happy Clients",
      icon: <FaUsers className="h-6 w-6 text-blue-400" />,
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: <FaChartLine className="h-6 w-6 text-blue-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${AboutBackground})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About <span className="text-blue-400">InfinityOS</span>
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Transforming workplace management with intelligent solutions
              designed for the modern enterprise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Company Story Section */}
      <motion.section
        className="py-20 px-6 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-300">
                Our Story
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                Founded in 2020, InfinityOS was born from a simple observation:
                traditional employee management systems were complicated, rigid,
                and disconnected from how modern teams actually work.
              </p>
              <p className="text-lg text-gray-200 mb-6">
                We set out to create a platform that would not just track tasks
                and time, but would genuinely enhance workplace wellbeing, team
                collaboration, and personal productivity.
              </p>
              <p className="text-lg text-gray-200">
                Today, InfinityOS powers thousands of teams across the globe,
                helping organizations of all sizes build more engaged,
                productive, and happier workplaces.
              </p>
            </div>
            <div className="md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-2xl shadow-2xl">
              <div className="bg-gray-900 rounded-xl p-8">
                <div className="mb-8">
                  <FaRocket className="text-4xl text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-gray-300">
                    To empower organizations by providing an intelligent,
                    human-centered platform that transforms how teams work,
                    collaborate, and thrive together.
                  </p>
                </div>
                <div className="border-t border-gray-700 pt-8">
                  <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                  <p className="text-gray-300">
                    A world where technology enhances human potential in the
                    workplace, creating environments where people feel valued,
                    productive, and fulfilled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        className="py-20 px-6 md:px-12 bg-gray-900 bg-opacity-50"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="text-xl text-blue-200 max-w-3xl mx-auto"
              variants={itemVariants}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl hover:transform hover:scale-105 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-4 rounded-full inline-block mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-blue-900 bg-opacity-40 rounded-xl p-8 text-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            >
              <div className="mx-auto bg-blue-800 bg-opacity-50 p-3 rounded-full inline-block mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-blue-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Team Section */}
      <motion.section
        className="py-20 px-6 md:px-12 bg-indigo-900 bg-opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Meet the people driving our mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 mb-4">{member.role}</p>
                  <p className="text-gray-300 italic">"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-indigo-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
              Discover how InfinityOS can transform your workplace experience
              and empower your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
              <motion.a
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
