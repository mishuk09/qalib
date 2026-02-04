import { Mail, MessageSquare, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";

const MyConnection = () => {
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
      const response = await fetch("https://qalib.cloud/api/user/connections", {
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

  const confirmAndDelete = async () => {
    const index = connections.findIndex((conn) => conn.email === confirmDelete.email);
    if (index !== -1) {
      await handleRemoveConnection(confirmDelete.email, index);
    }
    closeDeleteConfirm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Connections</h1>
          <p className="text-gray-600">
            You have <span className="font-semibold text-blue-600">{connections.length}</span>{" "}
            connection{connections.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty State */}
        {connections.length === 0 && !error && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <User size={32} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No connections yet</h2>
            <p className="text-gray-500 mb-6">
              Start connecting with people to build your network!
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Header with Avatar */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-3xl mb-2 border-2 border-white">
                    {connection.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{connection.fullName}</h3>
                  <p className="text-blue-100 text-sm">{connection.batch || "N/A"}</p>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Program */}
                  {connection.cohortinformation?.programName && (
                    <div className="bg-blue-50 rounded-lg p-3 text-sm">
                      <p className="text-gray-600">
                        <span className="font-semibold">Program:</span>{" "}
                        {connection.cohortinformation.programName}
                      </p>
                    </div>
                  )}

                  {/* Demographics */}
                  <div className="text-sm text-gray-600 space-y-1">
                    {connection.demographics?.age && (
                      <p>
                        <span className="font-semibold">Age:</span> {connection.demographics.age}
                      </p>
                    )}
                    {connection.demographics?.currentLocation && (
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {connection.demographics.currentLocation}
                      </p>
                    )}
                    {connection.demographics?.education_level && (
                      <p>
                        <span className="font-semibold">Education:</span>{" "}
                        {connection.demographics.education_level}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="border-t pt-3 text-xs text-gray-500 flex items-center gap-1">
                    <Mail size={14} />
                    <span className="truncate">{connection.email}</span>
                  </div>

                  {/* Connected Date */}
                  {connection.connectedAt && (
                    <p className="text-xs text-gray-400 text-center">
                      Connected on {new Date(connection.connectedAt).toLocaleDateString()}
                    </p>
                  )}

                  {/* Note */}
                  {connection.note && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-gray-700">
                      <p className="font-semibold text-yellow-800 mb-1">Note:</p>
                      <p>{connection.note}</p>
                    </div>
                  )}

                  {/* Messages */}
                  {deleteMessage.id === connection.email && (
                    <p
                      className={`text-xs text-center ${deleteMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
                    >
                      {deleteMessage.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="border-t px-4 py-3 flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    <MessageSquare size={16} />
                    Message
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(connection.email, connection.fullName)}
                    disabled={removingId === connection.email}
                    className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Remove Connection?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-blue-600">{confirmDelete.fullName}</span> from
                your connections? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={closeDeleteConfirm}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAndDelete}
                  disabled={removingId !== null}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  {removingId ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyConnection;
