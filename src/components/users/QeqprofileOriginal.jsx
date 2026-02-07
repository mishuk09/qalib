import React from "react";
import { FaChartLine, FaUsers, FaGlobe, FaStar, FaUserFriends, FaLink } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { motion } from "framer-motion";
import Sidebar from "../../utills/Sidebar";
import Qeqprofile from "./Qeqprofile";

const QeqprofileOriginal = () => {
  
    return (
          <div className="bg-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <Sidebar />
          </aside>
          <main className="lg:col-span-9 space-y-6">
            <Qeqprofile/>
          </main>
        </div>
      </div>
         
    );
};

export default QeqprofileOriginal;