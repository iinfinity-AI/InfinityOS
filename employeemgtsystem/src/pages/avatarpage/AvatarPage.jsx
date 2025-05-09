import React, { useState } from "react";
import BreadCrumb from "../../components/sidebar/BreadCrumb";
import SideBar from "../../components/sidebar/SideBar";
import PersonalDetails from "../../components/sidebar/PersonalDetails";

export default function AvatarPage() {
  const [activeItem, setActiveItem] = useState("Personal Details");

  return (
    <div className="bg-blue-50 min-h-screen px-6 pt-24 pb-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-4">
        <BreadCrumb current={activeItem} />
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="flex-1 ">
          {activeItem === "Personal Details" && (
            <PersonalDetails
              name="Biruk Dawit"
              department="Design & Marketing"
              jobTitle="UI / UX Designer"
              jobCategory="Full time"
              avatarUrl="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
            />
          )}
        </div>
      </div>
    </div>
  );
}
