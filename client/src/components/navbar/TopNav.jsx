import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const avatarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarMenu(false);
      }
    }
    if (avatarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarMenu]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setAvatarMenu(false);
    navigate("/login");
  };

  const navItems = ["Dashboard", "Requests", "Payroll", "Company", "Extras"];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex justify-between items-center">
 
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

 
      <div className="hidden md:flex gap-6 text-gray-800 font-medium">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            onClick={() => setActiveLink(item)}
            className={`pb-1 ${
              activeLink === item ? "border-b-2 border-yellow-400" : ""
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <div className="relative" ref={avatarRef}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
              alt="profile"
              className="w-8 h-8 rounded-full border cursor-pointer"
              onClick={() => setAvatarMenu((v) => !v)}
            />
            {avatarMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                  onClick={() => setAvatarMenu(false)}
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>


      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white flex flex-col p-4 gap-3 shadow-md md:hidden z-10">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => {
                setActiveLink(item);
                setMenuOpen(false);
              }}
              className={`text-gray-800 ${
                activeLink === item ? "font-semibold text-yellow-600" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
