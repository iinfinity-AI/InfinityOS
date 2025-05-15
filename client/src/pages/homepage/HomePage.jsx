import React from 'react';
import HomeNav from '../../components/navbar/HomeNav'; 
import HomeBack from '../../assets/homepage/HomeBack.jpg'; 

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${HomeBack})`,
      }}
    >
      <HomeNav />

      <div className="flex flex-col items-center justify-center text-center px-4 py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">
          Powering Smarter Teams, Every Day
        </h1>
        <p className="text-lg leading-relaxed">
          InfinityOS streamlines team management with smart dashboards, task tracking, and mood check-ins—all in one platform. Enhance productivity, boost engagement, and build a healthier workplace with InfinityOS.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
