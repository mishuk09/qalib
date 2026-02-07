import { Home, Library, Plus, Star, User, Users, UsersRound } from "lucide-react";
import MiniLoading from "./miniLoading";
import useUserData from "./useUserData";

const Sidebar = () => {
  const { userData, loading } = useUserData();

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-full border border-gray-300 overflow-hidden flex items-center justify-center">
          {userData?.profilePhoto?.path ? (
            <img
              src={userData.profilePhoto.path}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-white object-cover"
            />
          ) : (
            <span className="w-24 h-24 flex items-center justify-center text-6xl border-2 border-white rounded-full bg-white">
              {userData?.demographics?.gender?.toLowerCase() === "male" ? "👦🏻" : "👩🏻"}
            </span>
          )}
        </div>

        <h2 className="mt-3 text-lg font-semibold">
          {loading ? <MiniLoading /> : userData?.fullName}
        </h2>
        {/* <p className="text-sm leading-4 text-gray-500">
                                🎓  {userData?.demographics?.field_of_study}
                            </p>
                            <p className="text-sm mt-1 text-gray-400">
                                🏠︎  {userData?.demographics?.place_of_residence}
                            </p> */}
      </div>

      {/* Shortcuts */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3">Quick Links</h3>
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
            <Plus size={16} />
            <a href="/my-connections">My Connections</a>
          </li>

          <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
            <UsersRound size={16} />
            <a href="/dream-team">My Dream Team</a>
          </li>

          <li className="flex items-center gap-2 hover:text-blue-800 cursor-pointer">
            <Star size={16} />
            <a href="/qeq-profile">QEQ Profile Survey</a>
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
      </div>
    </div>
  );
};

export default Sidebar;
