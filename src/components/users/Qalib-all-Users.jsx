import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../../utills/Items";
import Spin from "../../utills/Spin";

const calculateIeiScore = (survey) => {
  if (!survey || typeof survey !== "object") return "-";

  const groups = {};

  Object.keys(survey).forEach((key) => {
    const match = key.match(/[A-Za-z]+/);
    if (!match) return;

    const group = match[0];
    if (!groups[group]) groups[group] = [];

    const value = parseFloat(survey[key]);
    if (!Number.isNaN(value)) {
      groups[group].push(value);
    }
  });

  const summarized = {};
  Object.keys(groups).forEach((group) => {
    const values = groups[group];
    if (values.length > 0) {
      summarized[group] = values.reduce((a, b) => a + b, 0) / values.length;
    }
  });

  const ieiGroups = ["D", "H", "Att", "PBC", "II"];
  const ieiValues = ieiGroups
    .map((key) => summarized[key])
    .filter((val) => typeof val === "number" && !Number.isNaN(val));

  if (ieiValues.length === 0) return "-";
  const totalIei = ieiValues.reduce((a, b) => a + b, 0);
  return totalIei.toFixed(2);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "-";
  }
};

const QalibAllUsers = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://qalib.cloud/api/users");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openUserByEmail = (email) => {
    if (!email) return;
    const cleanEmail = email.replace(/\s+/g, "");
    navigate(`/by-email?email=${encodeURIComponent(cleanEmail)}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition mb-6"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 mt-6">All users</h1>

      <div className="flex justify-between">
        <div className="flex items-center gap-4 mt-10 mb-3">
          <Items name={`Users (${users.length})`} />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[350px]">
          <Spin />
        </div>
      ) : currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {currentItems.map((user, index) => (
            <div
              onClick={() => openUserByEmail(user.email)}
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-34 p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-20 -mr-6 -mt-6"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="  mx-auto rounded-full bg-white flex items-center justify-center text-3xl mb-3 border-4 border-blue-200 shadow-md">
                    {user.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"}
                  </div>
                  <h3 className="font-bold text-white text-lg">{user.fullName || user.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Joined Date</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(user.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-semibold text-gray-900">
                      {user.demographics?.gender || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Age</span>
                    <span className="font-semibold text-gray-900">
                      {user.demographics?.ageGroup || user.demographics?.age || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Education</span>
                    <span className="font-semibold text-gray-900 text-right max-w-xs">
                      {user.demographics?.educationLevels ||
                        user.demographics?.education_level ||
                        "-"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                    QEQ/IEI Score
                  </p>
                  <p className="text-lg font-bold text-indigo-600">
                    {calculateIeiScore(user.survey)}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-md hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center mt-4">
          <p className="text-gray-600">No users found</p>
        </div>
      )}

      <div className="pagination flex justify-end space-x-2 p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 border shadow rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded-lg transition-colors ${
              currentPage === index + 1 ? "bg-red-500 text-white" : "hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border shadow rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QalibAllUsers;
