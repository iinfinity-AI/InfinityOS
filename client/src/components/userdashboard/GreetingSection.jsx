import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GreetingSection = () => {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = today.toLocaleDateString("en-GB", options);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    if (userJSON) {
      try {
        const user = JSON.parse(userJSON);
        if (user && user.name) {
          setName(user.name);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <section className="bg-[#29469B] text-white px-8 py-4 flex justify-between items-center mb-6 rounded-r-md">
      <div>
        <p className="font-semibold">{formattedDate}</p>
        <h1 className="text-3xl font-bold">
          Hello  {name || "Guest"}<span className="text-yellow-400"> !</span> 
        </h1>
      </div>

      <button
        onClick={goToProfile}
        className="bg-yellow-400 px-5 py-2 rounded-md font-semibold hover:shadow-md transition"
      >
        Edit Profile
      </button>
    </section>
  );
};

export default GreetingSection;
