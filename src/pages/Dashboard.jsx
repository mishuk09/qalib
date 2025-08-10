import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
    return (
        <>
          
            <div className="bg-blue-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Sidebar - 20% */}
                    <aside className="lg:col-span-3 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                                <img
                                    src="path_to_your_image.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="mt-3 text-lg font-semibold">Mahadi Hasan Mishuk</h2>
                            <p className="text-sm text-gray-500">Full-Stack Developer | MERN Stack</p>
                            <p className="text-xs text-gray-400">Melaka, Malacca</p>
                            <div className="mt-4 space-y-1 text-sm">
                                <p><span className="font-semibold">Profile viewers:</span> 104</p>
                                <p><span className="font-semibold">Post impressions:</span> 1,227</p>
                            </div>
                        </div>

                        {/* Shortcuts */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold mb-3">Quick Links</h3>
                            <ul className="space-y-2 text-sm text-blue-600">
                                <li><a href="#">My Connections</a></li>
                                <li><a href="#">Saved Posts</a></li>
                                <li><a href="#">Groups</a></li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content - 60% */}
                    <main className="lg:col-span-6 space-y-6">
                        {/* Post */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img
                                        src="path_to_your_image.jpg"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Mohnad Moamen</h2>
                                    <p className="text-sm text-gray-500">
                                        Automation Architect at e& UAE
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm">
                                    Mohnad started a new position 🚀 Congratulations!
                                </p>
                            </div>
                            <div className="flex mt-4 space-x-3">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    Like
                                </button>
                                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                                    Comment
                                </button>
                                <button className="px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-400 transition">
                                    Congratulations!
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Right Sidebar - 20% */}
                    <aside className="lg:col-span-3 space-y-6">
                        {/* Suggestions */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-semibold mb-3">People you may know</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((id) => (
                                    <div key={id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                            <div>
                                                <p className="text-sm font-semibold">User {id}</p>
                                                <p className="text-xs text-gray-500">Role / Company</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 text-sm">Connect</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-white rounded-lg shadow-md p-4 text-center text-sm text-gray-500">
                            © 2025 Qalib Network
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
