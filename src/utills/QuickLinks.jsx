import { Home, Library, Plus, Star, User, UsersRound } from "lucide-react";

const QuickLinks = () => {
 
  return (
    <div className="space-y-4">
       
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

export default QuickLinks;
