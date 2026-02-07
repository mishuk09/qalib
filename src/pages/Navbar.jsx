import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Home, Library, LogOut, Star, User, Users, UsersRound } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import qaliblogo2 from "../assets/qaliblogo-2.png";
import useUserData from "../utills/useUserData";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const { userData, loading } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen && isMobile) {
      setSearchText("");
      setSearchResults([]);
    }
  }, [menuOpen, isMobile]);

  const handleSearch = async (value) => {
    setSearchText(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await axios.get(`https://qalib.cloud/api/search-users?query=${value}`);
      setSearchResults(res.data.users || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center py-3">
        {/* Logo & Search */}
        <div className="flex items-center gap-6">
          {/* <a href="/dashboard" className="shrink-0">
            <img src={qaliblogo} alt="Qalib Logo" className="w-18" />
          </a> */}
          <a href="/dashboard" className="shrink-0">
            <img src={qaliblogo2} alt="Qalib Logo" className="w-18" />
          </a>

          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-full py-2 pl-4 pr-10 w-64 lg:w-80"
            />

            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {searchText && (
          <div className="absolute top-40 md:top-24 max-w-3xl mx-auto bg-white border border-gray-300 p-2 shadow-lg rounded-lg max-h-72 overflow-y-auto z-50">
            {searchLoading && <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>}

            {!searchLoading && searchResults.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">No users found</div>
            )}

            {searchResults.map((user, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/profile/${user.email}`);
                  setSearchText("");
                  setSearchResults([]);
                }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {/* Avatar */}
                {user.profilePhoto?.path ? (
                  <img
                    src={user.profilePhoto.path}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                    {/* {user.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"} */}
                    <User />
                  </div>
                )}

                {/* Info */}
                <div>
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-gray-500">
                    {user.cohortinformation?.programName || "User"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:text-blue-500 transition-colors"
              title="Profile"
            >
              {userData?.profilePhoto?.path ? (
                <img
                  src={userData.profilePhoto.path}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              ) : (
                <span className="w-10 h-10  flex items-center justify-center text-6xl border-2 border-blue-200 rounded-full bg-white">
                  <User />
                </span>
              )}
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 overflow-hidden">
                <a href="/dashboard" className="block px-4 py-2 hover:bg-blue-50">
                  Home
                </a>
                <a href="/profile" className="block px-4 py-2 hover:bg-blue-50">
                  Profile
                </a>
                {/* <a href="#" className="block px-4 py-2 hover:bg-blue-50">
                  Settings
                </a> */}
                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-blue-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-4 animate-slideDown">
          <div className="relative block sm:hidden">
            <input
              type="text"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-full py-2 pl-4 pr-10 w-full"
            />
            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="bg-white  py-1 w-48">
            <ul className="space-y-2 text-sm text-blue-600">
              {/* <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                  <ClipboardList size={16} />
                  <a href="/survey-form"> Profiling Survey</a>
                </li> */}

              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <Home size={16} />
                <a href="/dashboard">Home</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <User size={16} />
                <a href="/profile">Profile</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <Users size={16} />
                <a href="/my-connections">My Connections</a>
              </li>

              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <UsersRound size={16} />
                <a href="/dream-team">My Dream Team</a>
              </li>

              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <Star size={16} />
                <a href="/qeq-profile-original">QEQ Profile Survey</a>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <Library size={16} />
                <a href="/resources" target="_blank">
                  Library
                </a>
              </li>

              <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
                <Star size={16} />
                <a href="/big-five">Big 5 Personality Traits</a>
              </li>
            </ul>

            <div className="my-1 border-t border-gray-100"></div>

            <button
              onClick={handleLogout}
              className="  w-full flex items-center font-bold  text-left px- py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none"
            >
              <LogOut size={16} className="me-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
