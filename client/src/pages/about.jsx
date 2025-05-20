import React from "react";

const About = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-[#0A4D88] mb-6">About INFINITYOS EMS</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        INFINITYOS Employee Management System (EMS) is designed to streamline and simplify
        workforce management for organizations of all sizes. From attendance tracking to
        performance evaluations, our platform offers a comprehensive suite of tools tailored
        to optimize employee productivity and HR workflows.
      </p>
      <section className="bg-[#0A4D88] text-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-relaxed">
          To empower businesses by providing an intuitive, reliable, and secure employee
          management solution that enhances workforce efficiency and fosters growth.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Core Values</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Reliability:</strong> Ensuring consistent and accurate employee data management.</li>
          <li><strong>Security:</strong> Protecting sensitive employee information with top-notch security standards.</li>
          <li><strong>Usability:</strong> Offering an easy-to-use platform accessible to HR professionals and managers.</li>
          <li><strong>Innovation:</strong> Continuously improving with the latest HR technology trends.</li>
        </ul>
      </section>
    </main>
  );
};

export default About;
