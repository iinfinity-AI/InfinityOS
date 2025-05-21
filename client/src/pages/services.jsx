import React, { useState } from "react";
import ServicesBg from '../../src/assets/homepage/HomeBack.jpg';

const services = [
  {
    id: 1,
    title: "Attendance & Leave Management",
    description:
      "Track employee attendance, leave balances, and automate approvals with customizable workflows.",
    extra: "This module enables managers to monitor working hours and ensures compliance with company policies.",
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
  },
  {
    id: 2,
    title: "Performance Reviews",
    description:
      "Set goals, evaluate employee performance, and provide feedback all within one platform.",
    extra: "Helps in identifying top talent, skill gaps, and improvement areas with structured review cycles.",
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
  },
  {
    id: 3,
    title: "Payroll Integration",
    description:
      "Seamlessly manage payroll calculations and integrate with popular payroll services.",
    extra: "Automates tax deductions, payment schedules, and compliance reports integrated with HR records.",
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
  },
];

const Services = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (id) => {
    setActiveCard(prev => prev === id ? null : id); // toggle
  };

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${ServicesBg})` }}
      ></div>

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center drop-shadow">
          INFINITY OS EMS Services
        </h1>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map(({ id, title, description, extra, icon }) => (
            <div
              key={id}
              onClick={() => handleCardClick(id)}
              className={`cursor-pointer bg-white/90 text-gray-900 rounded-xl border-t-[6px] 
                p-8 shadow-md transition-all duration-500 
                ${activeCard === id ? "ring-4 ring-[#0A4D88]/70 scale-105 bg-white" : "hover:ring-2 hover:ring-[#0A4D88]/60"}
              `}
            >
              <div className="w-16 h-16 bg-[#0A4D88] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
              <p className="text-gray-700 text-center leading-relaxed">{description}</p>

              {activeCard === id && (
                <div className="mt-4 text-sm text-gray-600 border-t pt-4 text-left">
                  <p>{extra}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Services;
