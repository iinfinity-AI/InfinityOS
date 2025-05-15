import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0A4D88] text-white py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side */}
        <div className="text-sm">
          Copyright © 2024 InfinityOS
        </div>

        {/* Right side */}
        <div className="flex space-x-8 text-sm">
          <a href="/privacy" className="hover:underline cursor-pointer">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline cursor-pointer">
            Terms & Services
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
