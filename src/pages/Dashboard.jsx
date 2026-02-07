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
            {/* <div className="bg-gray-50 rounded-xl p-4">
              {users.map((user) => (
                <div
                  key={user.id || user._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300 p-5 mb-4 border border-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center text-3xl">
                      {user.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {user.fullName?.split(" ").slice(0, 2).join(" ") || "Unknown User"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {user.demographics?.age ? `${user.demographics.age} • ` : ""}
                        {user.demographics?.gender || "N/A"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        🌍 {user.demographics?.currentLocation || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-100">
                    <div className="grid grid-cols-[48px_1fr] gap-3 items-start">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-xl">
                        🎓
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 break-words">
                          {user.demographics?.education_level || "Education N/A"}
                          {user.demographics?.field_of_study && (
                            <span className="text-gray-600 font-normal block mt-1 break-words">
                              {user.demographics.field_of_study}
                            </span>
                          )}
                        </p>

                        {user.demographics?.university_college_name ? (
                          <p
                            className="text-xs text-gray-500 mt-2 break-words"
                            title={user.demographics.university_college_name}
                          >
                            🏛️ {user.demographics.university_college_name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 mt-2 italic">
                            University not specified
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {user.behavior_data && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {Object.values(user.behavior_data).map((trait, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-[0.98] transition">
                      🔗 Connect
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 active:scale-[0.98] transition">
                      ❤️ Shortlist
                    </button>
                  </div>
                </div>
              ))}
            </div> */}
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
