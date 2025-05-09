import React from "react";

export default function JobDetails() {
  const jobData = {
    role: "UI UX Designer",
    department: "Design & Marketing",
    lineManager: "Mr Domino’s Pizza",
    responsibilities: [
      "Creating user-centered designs by understanding business requirements, and user feedback",
      "Creating user flows, wireframes, prototypes and mockups",
      "Translating requirements into style guides, design systems, design patterns and attractive user interfaces",
      "Designing UI elements such as input controls, navigational components and informational components",
      "Creating original graphic designs (e.g. images, sketches and tables)",
      "Identifying and troubleshooting UX problems (e.g. responsiveness)",
      "Collaborating effectively with product, engineering, and management teams",
      "Incorporating customer feedback, usage metrics, and usability findings into design in order to enhance user experience"
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
      <div className="space-y-6 overflow-auto flex-1">
        <a href="#" className="text-blue-800 text-sm font-medium underline">
          View Job Details
        </a>

        <div className="text-center space-y-1">
          <p className="text-gray-600 font-medium">Job Role</p>
          <h2 className="text-2xl font-bold">{jobData.role}</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 text-center">
          <div>
            <p className="text-gray-500 text-sm">Department</p>
            <p className="text-lg font-semibold">{jobData.department}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Line Manager</p>
            <p className="text-lg font-semibold">{jobData.lineManager}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-center mb-2">Job Description</h3>
          <p className="text-sm text-gray-800 mb-2 text-center">
            Your responsibilities will include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            {jobData.responsibilities.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <button className="bg-blue-800 text-white px-6 py-2 rounded shadow hover:bg-blue-900">
          Upload Documents
        </button>
        <button className="border border-green-700 text-green-700 px-6 py-2 rounded shadow hover:bg-green-50">
          View Documents
        </button>
      </div>
    </div>
  );
}
