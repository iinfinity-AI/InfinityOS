import React from "react";
import { FaEye } from "react-icons/fa";

const candidates = [
  { name: "Feven Tesfaye", role: "Backend Engineer" },
  { name: "Yanet Mekuriya", role: "Sales" },
  { name: "Aman Beyene", role: "Product Manager" },
];

const CandidateCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-bold mb-4">Candidates</h2>
    {candidates.map((candidate, index) => (
      <div key={index} className="flex items-center justify-between mb-3 border p-2 rounded">
        <div>
          <p className="font-semibold">{candidate.name}</p>
          <p className="text-sm text-gray-500">Applied for: {candidate.role}</p>
        </div>
        <button className="text-green-600 text-xl"><FaEye /></button>
      </div>
    ))}
  </div>
);

export default CandidateCard;
