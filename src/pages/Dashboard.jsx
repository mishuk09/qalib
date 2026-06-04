import { useEffect, useState } from "react";
import MiniLoading from "../utills/miniLoading";
import useUserData from "../utills/useUserData";

import { Library, Star, Users, UsersRound } from "lucide-react";
import ConnectionsPage from "../components/users/ConnectionsPage";
import SurveyForm from "../components/users/SurveyForm";
import CreatePost from "./Post/CreatePost";
import MainFeed from "./Post/MainFeed";
import Sidebar from "../utills/Sidebar";

const API_BASE = "https://qalib.cloud/api/users";
const API_URL = "https://qalib.cloud/api/users";

const Dashboard = () => {
  const { userData, loading, refetch } = useUserData();

  const [secondModalOpen, setSecondModalOpen] = useState(false);

  useEffect(() => {
    if (userData && !userData.issurveyDone) {
      const timer = setTimeout(() => {
        setSecondModalOpen(true);
      }, 1500);

      // Cleanup in case user leaves early
      return () => clearTimeout(timer);
    }
  }, [userData]);

  const handleSurveySuccess = () => {
    refetch(); // Refetch user data to update issurveyDone
    setSecondModalOpen(false); // Close the modal
  };

  return (
    <div className="relative">
      {secondModalOpen && (
        <div className="fixed inset-0 top-20 bg-black/40 flex items-center justify-center z-20">
          {/* Modal Content */}
          <div
            className="bg-white relative p-2 m-2 lg:p-6 max-w-4xl w-full h-[80vh] rounded-xl shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // ensure inside clicks don’t propagate
          >
            {/* Close Button */}
            <button
              onClick={() => setSecondModalOpen(false)}
              className="px-3 py-1 sticky top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <SurveyForm onSuccess={handleSurveySuccess} />
          </div>
        </div>
      )}

      <div className="bg-blue-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - 20% */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky top-20 self-start">
            <Sidebar /> 
          </aside>

          {/* Main Content - 60% */}
          <main className="lg:col-span-6 space-y-6">
            {/* Post */}
            <CreatePost />
            {/* <Feed /> */}
            <MainFeed />
            
          </main>

          {/* Right Sidebar - 20% */}
          <aside className="lg:col-span-3 space-y-6 sticky top-20 self-start">
            {/* Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <ConnectionsPage />
            </div>

            {/* Footer */}
            <div className="bg-white rounded-lg shadow-md p-4 text-center text-sm text-gray-500">
              © 2025 Qalib Network
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
