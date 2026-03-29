import { MessageSquare, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../utills/Sidebar";

const MyConnection = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState({ id: null, message: "", type: "" });
  const [confirmDelete, setConfirmDelete] = useState({ email: null, fullName: null });

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view connections");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://qalib.cloud/api/user/connections", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setConnections(data.connections || []);
        setError("");
      } else {
        setError(data.error || "Failed to load connections");
      }
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Error loading connections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveConnection = async (connectionEmail, index) => {
    setRemovingId(connectionEmail);
    const token = localStorage.getItem("token");

    if (!token) {
      setDeleteMessage({ id: connectionEmail, message: "Please log in", type: "error" });
      setRemovingId(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/connections", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetEmail: connectionEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove from UI after successful deletion
        const updatedConnections = connections.filter((_, i) => i !== index);
        setConnections(updatedConnections);
        setDeleteMessage({ id: connectionEmail, message: "Connection removed", type: "success" });
        setConfirmDelete({ email: null, fullName: null });

        setTimeout(() => {
          setDeleteMessage({ id: null, message: "", type: "" });
        }, 2000);
      } else {
        setDeleteMessage({
          id: connectionEmail,
          message: data.error || "Failed to remove connection",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Error removing connection:", err);
      setDeleteMessage({
        id: connectionEmail,
        message: "Error removing connection",
        type: "error",
      });
    } finally {
      setRemovingId(null);
    }
  };

  const openDeleteConfirm = (connectionEmail, fullName) => {
    setConfirmDelete({ email: connectionEmail, fullName });
  };

  const closeDeleteConfirm = () => {
    setConfirmDelete({ email: null, fullName: null });
  };

  // const openUserByEmail = (email) => {
  //   if (!email) return;
  //   navigate(`/by-email?email=${encodeURIComponent(email)}`);
  // };

  const openUserByEmail = (email) => {
    if (!email) return;

    const cleanEmail = email.replace(/\s+/g, ""); // removes spaces, tabs, etc

    navigate(`/by-email?email=${encodeURIComponent(cleanEmail)}`);
  };

  const confirmAndDelete = async () => {
    const index = connections.findIndex((conn) => conn.email === confirmDelete.email);
    if (index !== -1) {
      await handleRemoveConnection(confirmDelete.email, index);
    }
    closeDeleteConfirm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-16 w-16 border-2 border-blue-200 border-t-blue-600 shadow-lg"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Sidebar />
        </aside>
        <main className="lg:col-span-9">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h1 className="lg:text-2xl font-bold text-gray-900 mb-2">My Connections</h1>
                  <p className="text-gray-600">Build and manage your professional network</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-xl font-bold text-blue-600">{connections.length}</span>
                  <span className="text-gray-600 font-medium">
                    Connection{connections.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">Error loading connections</p>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {connections.length === 0 && !error && (
              <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-16 text-center">
                <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-6 border border-blue-200">
                  <User size={48} className="text-blue-600 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">No connections yet</h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  Start building your network by connecting with people who share your interests and
                  goals.
                </p>
                <a
                  href="/dashboard"
                  className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold"
                >
                  Find People to Connect
                </a>
              </div>
            )}

            {/* Connections Grid */}
            {connections.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connections.map((connection, index) => (
                  <div
                    key={connection.email}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Card Header with Avatar */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-52 p-6 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-20 -mr-8 -mt-8"></div>
                      <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center text-4xl mb-3 border-4 border-blue-200 shadow-md">
                          {connection.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"}
                        </div>
                        <h3 className="font-bold text-white text-xl">{connection.fullName}</h3>
                        <p className="text-blue-100 text-sm font-medium">
                          {connection.demographics?.employmentStatus || "Not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4 flex-grow">
                      
                      {/* {connection.cohortinformation?.programName && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">
                            Program
                          </p>
                          <p className="text-gray-800 font-medium">
                            {connection.cohortinformation.programName}
                          </p>
                        </div>
                      )} */}

                      {/* Demographics Grid */}
                      <div className="space-y-2">
                        {connection.demographics?.age && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Age</span>
                            <span className="font-semibold text-gray-900">
                              {connection.demographics.age}
                            </span>
                          </div>
                        )}
                        {connection.demographics?.currentLocation && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Location</span>
                            <span className="font-semibold text-gray-900 text-right max-w-xs">
                              {connection.demographics.currentLocation}
                            </span>
                          </div>
                        )}
                        {connection.demographics?.education_level && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Education</span>
                            <span className="font-semibold text-gray-900">
                              {connection.demographics.education_level}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                          Email
                        </p>
                        <p className="text-sm text-gray-700 truncate font-medium">
                          {connection.email}
                        </p>
                      </div>

                      {/* Connected Date */}
                      {connection.connectedAt && (
                        <p className="text-xs text-gray-400 text-center">
                          Connected{" "}
                          {new Date(connection.connectedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}

                      {/* Note */}
                      {connection.note && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <p className="font-semibold text-amber-900 text-xs uppercase tracking-wide mb-1">
                            Note
                          </p>
                          <p className="text-sm text-amber-800">{connection.note}</p>
                        </div>
                      )}

                      {/* Messages */}
                      {deleteMessage.id === connection.email && (
                        <p
                          className={`text-xs text-center font-semibold py-2 px-3 rounded-lg ${
                            deleteMessage.type === "success"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {deleteMessage.message}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 px-6 py-4 space-y-2">
                      <button
                        onClick={() => openUserByEmail(connection.email)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-md hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm"
                      >
                        <MessageSquare size={16} />
                        View Profile
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(connection.email, connection.fullName)}
                        disabled={removingId === connection.email}
                        className="w-full flex items-center justify-center gap-2 border-2 border-red-200 text-red-600 py-2.5 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete.email && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full border border-gray-200">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 mx-auto">
                    <Trash2 size={24} className="text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    Remove Connection?
                  </h2>
                  <p className="text-gray-600 mb-8 text-center">
                    Are you sure you want to remove{" "}
                    <span className="font-semibold text-gray-900">{confirmDelete.fullName}</span>{" "}
                    from your connections? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={closeDeleteConfirm}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAndDelete}
                      disabled={removingId !== null}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      {removingId ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyConnection;
