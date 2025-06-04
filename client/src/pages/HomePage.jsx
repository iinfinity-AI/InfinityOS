import React from 'react';
import HomeBack from '../../src/assets/homepage/HomeBack.jpg'; // Use your blurred image

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white">

      {/* Background Image with blur and dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${HomeBack})` }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Powering Smarter Teams,<br />Every Day
          </h1>
          <p className="text-base md:text-lg leading-relaxed">
            InfinityOS streamlines team management with smart dashboards, task tracking, and mood check-ins
            all in one platform. Enhance productivity, boost engagement, and build a healthier workplace with InfinityOS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
