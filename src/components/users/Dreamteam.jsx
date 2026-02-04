import React from "react";
import { motion } from "framer-motion";
import { UserCircle, Radar, Mail, UserPlus } from "lucide-react";

const DreamTeam = () => {
    const team = [
        {
            name: "Sarah Johnson",
            role: "Creative Strategist",
            score: 92,
            email: "sarah@teamqeq.com",
            color: "bg-blue-100",
        },
        {
            name: "David Kim",
            role: "Product Designer",
            score: 88,
            email: "david@teamqeq.com",
            color: "bg-green-100",
        },
        {
            name: "Emily Carter",
            role: "Marketing Lead",
            score: 85,
            email: "emily@teamqeq.com",
            color: "bg-yellow-100",
        },
        {
            name: "James Walker",
            role: "Data Analyst",
            score: 80,
            email: "james@teamqeq.com",
            color: "bg-purple-100",
        },
    ];

    return (
       <div className="min-h-screen bg-blue-50  ">
         <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Dream Team</h1>
                <p className="text-gray-500 mt-2">
                    Your top collaborative matches based on performance and synergy
                </p>
            </div>
            {/* <div className="mb-4">
                <a href="/dream-team-add" target="_blank" className="text-blue-600 px-4 py-2 border-2 border-blue-500 rounded   hover:underline">
                    + Add Your Data
                </a>
            </div> */}

            {/* Team Cards */}
            {/* <div className="space-y-5">
                {team.map((member, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`flex flex-col sm:flex-row items-center justify-between ${member.color} p-5 rounded-2xl shadow-sm hover:shadow-md transition-all`}
                    >
                        <div className="flex items-center gap-4">
                            <UserCircle className="w-12 h-12 text-gray-700" />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{member.name}</h2>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-0 text-center">
                            <p className="text-sm text-gray-500">QEQ Score</p>
                            <p className="text-xl font-bold text-gray-800">{member.score}</p>
                        </div>

                        <div className="flex gap-3 mt-3 sm:mt-0">
                            <button className="flex items-center gap-2 bg-white text-gray-700 px-3 py-2 rounded-xl shadow hover:bg-gray-100 transition-all">
                                <Mail className="w-4 h-4" /> Message
                            </button>
                            <button className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-xl shadow hover:bg-gray-700 transition-all">
                                <Radar className="w-4 h-4" /> View Chart
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div> */}

            {/* Footer CTA */}
            <div className="mt-10 flex justify-center">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all">
                    {/* <UserPlus className="w-5 h-5" /> No user yet */}
                    No user yet
                </button>
            </div>
        </div>
       </div>
    );
};

export default DreamTeam;
