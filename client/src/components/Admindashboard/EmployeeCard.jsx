import React from "react";
import { FaEye, FaDownload } from "react-icons/fa";

const employees = [
  { name: "Aman", role: "Product Manager" },
  { name: "Gelila", role: "Software Engineer" },
  { name: "Shaneli", role: "UI UX Designer" },
];

const EmployeeCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
    <h2 className="text-lg font-bold mb-4">Employees</h2>
    {employees.map((emp, index) => (
      <div key={index} className="flex items-center justify-between mb-3 border p-2 rounded">
        <div>
          <p className="font-semibold">{emp.name}</p>
          <p className="text-sm text-gray-500">Role: {emp.role}</p>
        </div>
        <div className="flex space-x-2">
          <button className="text-green-600"><FaEye /></button>
          <button className="text-blue-600"><FaDownload /></button>
        </div>
      </div>
    ))}
  </div>
);

export default EmployeeCard;
