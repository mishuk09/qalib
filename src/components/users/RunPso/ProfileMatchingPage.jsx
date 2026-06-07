import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PsoRunV2 from "./PsoRunV2";
import PsoRun from "./PsoRun";
 

export default function ProfileMatchingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-blue-50  p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition mb-6"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          {/* Profile Matching Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            <PsoRunV2 />
            <PsoRun />
          </div>
        </div>
      </div>
    </>
  );
}
