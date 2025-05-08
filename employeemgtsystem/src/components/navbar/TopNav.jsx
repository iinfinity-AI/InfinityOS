import { FaBell, FaEnvelope } from "react-icons/fa";

export default function TopNav() {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left - Tabs */}
      <div className="flex gap-6 text-gray-800 font-medium">
        <a href="#" className="border-b-2 border-yellow-400 pb-1">Dashboard</a>
        <a href="#">Requests</a>
        <a href="#">Payroll</a>
        <a href="#">Company</a>
        <a href="#">Extras</a>
      </div>

      {/* Right - Icons + Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <FaBell className="text-gray-700 text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
        </div>
        <div className="relative">
          <FaEnvelope className="text-green-600 text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </div>
  );
}
