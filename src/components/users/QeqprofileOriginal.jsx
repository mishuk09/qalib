import React from "react";
import { FaChartLine, FaUsers, FaGlobe, FaStar, FaUserFriends, FaLink } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { motion } from "framer-motion";

const QeqprofileOriginal = () => {
    const sections = [
        {
            title: "Score",
            icon: <FaChartLine className="text-blue-500 text-3xl" />,
            content: [
                { label: "My Score", value: "85" },
                { label: "Group Average", value: "78" },
            ],
        },
        {
            title: "Qalib Spider Web",
            icon: <FaGlobe className="text-green-500 text-3xl" />,
            content: [
                { label: "My Score", value: "80" },
                { label: "Growth", value: "▲ 5%" },
            ],
        },
        {
            title: "Dream Team",
            icon: <FaUsers className="text-purple-500 text-3xl" />,
            content: [{ label: "Spider Web", value: "View" }],
        },
        {
            title: "Entopreneur",
            icon: <FaStar className="text-yellow-500 text-3xl" />,
            content: [{ label: "Spider Web", value: "View" }],
        },
        {
            title: "Big Five",
            icon: <MdPersonSearch className="text-indigo-500 text-3xl" />,
            content: [{ label: "Personality Breakdown", value: "View" }],
        },
        {
            title: "My Match",
            icon: <FaUserFriends className="text-pink-500 text-3xl" />,
            content: [{ label: "Top Matches", value: "View" }],
        },
        {
            title: "My DNEA Team",
            icon: <FaLink className="text-red-500 text-3xl" />,
            content: [
                { label: "Matching", value: "View" },
                { label: "User Profiles", value: "Open" },
                { label: "Team Link", value: "Share" },
            ],
        },
    ];

    return (
        <div className="   bg-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="text-center mb-10 mt-6">
                    <h1 className="text-3xl font-bold text-gray-800">QEQ Profile</h1>
                    <p className="text-gray-500 mt-2">Your personal growth and performance dashboard</p>
                </div>

                {/* Grid Section */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sections.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {item.icon}
                                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                            </div>
                            <ul className="space-y-2">
                                {item.content.map((data, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-1"
                                    >
                                        <span className="font-medium">{data.label}</span>
                                        <span className="text-gray-800">{data.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QeqprofileOriginal;