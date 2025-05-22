import React from "react";
import AboutBackground from '../../src/assets/homepage/HomeBack.jpg'; // Same blurred image

const About = () => {
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${AboutBackground})` }}
      ></div>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow transition duration-1000 motion-safe:animate-slide-in-down">
          About INFINITYOS EMS
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-white drop-shadow transition-opacity duration-1000 delay-100 motion-safe:animate-fade-in">
          INFINITYOS Employee Management System (EMS) is designed to streamline and simplify
          workforce management for organizations of all sizes. From attendance tracking to
          performance evaluations, our platform offers a comprehensive suite of tools tailored
          to optimize employee productivity and HR workflows.
        </p>

        {/* Mission Section */}
        <section className="bg-[#0A4D88]/90 backdrop-blur-md rounded-lg p-6 md:p-10 shadow-lg mb-10 text-left transition-all duration-1000 motion-safe:animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="leading-relaxed text-white">
            To empower businesses by providing an intuitive, reliable, and secure employee
            management solution that enhances workforce efficiency and fosters growth.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="bg-white/90 text-gray-900 rounded-lg p-6 md:p-10 shadow-lg text-left transition-all duration-1000 motion-safe:animate-fade-in-up delay-200">
          <h2 className="text-2xl font-semibold mb-4">Core Values</h2>
          <ul className="list-disc list-inside space-y-3">
            <li><strong>Reliability:</strong> Ensuring consistent and accurate employee data management.</li>
            <li><strong>Security:</strong> Protecting sensitive employee information with top-notch security standards.</li>
            <li><strong>Usability:</strong> Offering an easy-to-use platform accessible to HR professionals and managers.</li>
            <li><strong>Innovation:</strong> Continuously improving with the latest HR technology trends.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
