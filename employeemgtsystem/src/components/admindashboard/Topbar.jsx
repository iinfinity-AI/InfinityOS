import { useNavigate } from "react-router-dom";
import { FaBell, FaWrench, FaEnvelope, FaChevronDown, FaSearch } from "react-icons/fa";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#e7f0fc]">
      {/* Search Bar + Filter */}
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md">
        <button className="bg-[#1E3A8A] text-white px-4 py-2 flex items-center gap-2">
          <span className="font-semibold">All Candidates</span>
          <FaChevronDown size={12} />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 outline-none text-gray-700 w-64"
        />
        <button className="px-4 text-gray-400">
          <FaSearch />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <IconButton
          icon={<FaBell />}
          count={13}
          color="bg-[#1E3A8A]"
          onClick={() => navigate("/notifications")}
        />
        <IconButton
          icon={<FaWrench />}
          count={0}
          color="bg-yellow-400"
          onClick={() => navigate("/settings")}
        />
        <IconButton
          icon={<FaEnvelope />}
          count={13}
          color="bg-green-600"
          onClick={() => navigate("/messages")}
        />
      </div>
    </div>
  );
};

const IconButton = ({ icon, count, color, onClick }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center shadow-md`}
    >
      {icon}
    </button>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
        {count}
      </span>
    )}
  </div>
);

export default Topbar;
