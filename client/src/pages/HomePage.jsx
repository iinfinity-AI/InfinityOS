import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeBack from "../../src/assets/homepage/HomeBack.jpg";
import dashboardImage from "../../src/assets/homepage/Screenshot 2025-06-11 092507.png";
import {
  FaTasks,
  FaChartLine,
  FaSmile,
  FaUsers,
  FaArrowRight,
  FaLightbulb,
  FaClock,
} from "react-icons/fa";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FaTasks className="w-8 h-8 text-blue-500" />,
      title: "Smart Task Management",
      description:
        "Assign, track, and complete tasks with intuitive workflows and real-time updates.",
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-green-500" />,
      title: "Performance Analytics",
      description:
        "Gain insights with detailed dashboards showing productivity trends and team metrics.",
    },
    {
      icon: <FaSmile className="w-8 h-8 text-yellow-500" />,
      title: "Mood & Wellness Tracking",
      description:
        "Monitor team sentiment and build a positive workplace culture with daily check-ins.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-purple-500" />,
      title: "Team Collaboration",
      description:
        "Connect teams across departments with shared goals and transparent communication.",
    },
  ];

  const benefits = [
    {
      icon: <FaLightbulb className="w-6 h-6 text-amber-400" />,
      title: "Boost Productivity",
      description: "35% average increase in task completion rates",
    },
    {
      icon: <FaClock className="w-6 h-6 text-blue-400" />,
      title: "Save Time",
      description: "Reduce meeting time by 25% with better async communication",
    },
    {
      icon: <FaSmile className="w-6 h-6 text-yellow-400" />,
      title: "Improve Satisfaction",
      description: "92% of teams report better work-life balance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HomeBack})`,
            backgroundPosition: "center 30%",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Modern <span className="text-blue-400">Workspace</span>{" "}
              Solution
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto">
              Boost productivity, improve team morale, and streamline workflows
              with our all-in-one employee management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Get Started Free
              </Link>
              <a
                href="#features"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
              >
                See Features
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="py-20 px-6 md:px-12 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Designed for Modern Teams
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-blue-800 bg-opacity-50 rounded-xl p-8 border border-blue-700 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-900 rounded-lg mr-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                </div>
                <p className="text-blue-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="py-20 px-6 md:px-12 bg-gradient-to-b from-blue-800 to-indigo-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Every Team
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Everything you need to manage your team, boost productivity, and
              enhance workplace culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 hover:bg-opacity-15 transition-all hover:transform hover:scale-105 border border-blue-400 border-opacity-20"
              >
                <div className="mb-4 bg-blue-900 bg-opacity-50 p-4 rounded-full inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshot Section */}
      <div className="py-20 px-6 md:px-12 bg-indigo-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Intuitive Interface, Powerful Results
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Our beautiful dashboard puts everything you need at your
              fingertips
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <img
                src={dashboardImage}
                alt="InfinityOS Dashboard"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-200 text-lg">
              Modern design with powerful analytics and task management
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 md:px-12 bg-gradient-to-b from-indigo-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Workplace?
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Join thousands of teams already using InfinityOS to boost
            productivity and employee satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Get Started Free
              <FaArrowRight className="ml-2" />
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-all"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
