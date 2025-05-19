import React from "react";

const services = [
  {
    id: 1,
    title: "Attendance & Leave Management",
    description:
      "Track employee attendance, leave balances, and automate approvals with customizable workflows.",
    icon: (
      <svg
        className="w-14 h-14 text-[#0A4D88] mx-auto mb-4"
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
    icon: (
      <svg
        className="w-14 h-14 text-[#0A4D88] mx-auto mb-4"
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
    icon: (
      <svg
        className="w-14 h-14 text-[#0A4D88] mx-auto mb-4"
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
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-5xl font-extrabold text-[#0A4D88] mb-12 text-center tracking-tight">
        INFINITY OS EMS Services
      </h1>
      <div className="grid gap-12 md:grid-cols-3">
        {services.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className="bg-white rounded-xl p-8 shadow-md hover:shadow-[#0A4D88]/40 transition-shadow duration-500 transform hover:-translate-y-2 cursor-pointer"
          >
            <div>{icon}</div>
            <h3 className="text-2xl font-semibold mb-3 text-center text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Services;
