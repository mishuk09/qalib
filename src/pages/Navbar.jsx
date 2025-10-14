import React, { useState } from 'react';
import {
    FaLinkedin,
    FaBell,
    FaSearch,
    FaHome,
    FaUser,
    FaUsers,

} from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import qaliblogo from '../assets/qaliblogo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

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
                    
                    <a href="/dashboard" className="shrink-0">
                        <img src={qaliblogo} alt="Qalib Logo" className="w-28 md:w-32" />
                    </a>

                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-full py-2 pl-4 pr-10 w-64 lg:w-80"
                        />
                        <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6 text-gray-600">
                    <button className="hover:text-blue-500 transition-colors" title="Home">
                        <FaHome size={22} />
                    </button>
                    <button className="hover:text-blue-500 transition-colors" title="My Network">
                        <FaUsers size={22} />
                    </button>

                    <button className="relative hover:text-blue-500 transition-colors" title="Notifications">
                        <FaBell size={22} />
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            4
                        </span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="hover:text-blue-500 transition-colors"
                            title="Profile"
                        >
                            <FaUser size={22} />
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 overflow-hidden">
                                <a href="/profile" className="block px-4 py-2 hover:bg-blue-50">Profile</a>
                                <a href="#" className="block px-4 py-2 hover:bg-blue-50">Settings</a>
                                <button onClick={handleLogout} className="block px-4 py-2 hover:bg-blue-50">Logout</button>
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
                            placeholder="Search..."
                            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-full py-2 pl-4 pr-10 w-full"
                        />
                        <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <FaHome /> Home
                    </button>
                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <FaUsers /> My Network
                    </button>
                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <FaBriefcase /> Jobs
                    </button>
                    <button className="flex items-center gap-2 relative text-gray-700 hover:text-blue-500">
                        <FaBell /> Notifications
                        <span className="absolute top-0 left-20 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            4
                        </span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <FaUser /> Me
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
