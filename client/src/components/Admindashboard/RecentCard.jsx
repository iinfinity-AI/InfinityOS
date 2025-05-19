import React from "react";

const recents = [
  { team: "Backend Team", project: "Project 1", time: "20 mins ago" },
  { team: "UI / UX Team", project: "Project 2", time: "10 mins ago" },
  { team: "WS marketing Team", project: "Project 1", time: "5 mins ago" },
];

const RecentCard = () => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
    <h2 className="text-lg font-bold mb-4">Recents</h2>
    {recents.map((item, index) => (
      <div key={index} className="border p-3 rounded-lg mb-3">
        <p className="font-semibold">{item.team}</p>
        <p className="text-sm text-gray-500">{item.project}</p>
        <p className="text-xs text-gray-400">{item.time}</p>
      </div>
    ))}
  </div>
);

export default RecentCard;
