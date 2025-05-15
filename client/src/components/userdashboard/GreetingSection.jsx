import React from "react";

const GreetingSection = ({ name }) => {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString("en-GB", options);

  return (
    <section className="bg-[#29469B] text-white px-8 py-4 flex justify-between items-center mb-6 rounded-r-md">
      <div>
        {/* Dynamically display today's date */}
        <p className="font-semibold">{formattedDate}</p>
        <h1 className="text-3xl font-bold">
          Hello <span className="text-yellow-400">!</span> {name}
        </h1>
      </div>

      <button className="bg-yellow-400 px-5 py-2 rounded-md font-semibold hover:shadow-md transition">
        Edit Profile
      </button>
    </section>
  );
};

export default GreetingSection;
