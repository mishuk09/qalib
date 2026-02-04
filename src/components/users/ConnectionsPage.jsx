import { useEffect, useState } from "react";

const API_URL = "https://qalib.cloud/api/users";

const ConnectionsPage = () => {
  const [siteusers, setSiteusers] = useState([]);
  const [connectingUsers, setConnectingUsers] = useState({});
  const [connectionMessage, setConnectionMessage] = useState({
    userId: null,
    message: "",
    type: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setSiteusers(data.users || []);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleConnect = async (targetUser) => {
    const targetKey = targetUser.id || targetUser._id || targetUser.email;
    const token = localStorage.getItem("token");
    if (!token) {
      setConnectionMessage({
        userId: targetKey,
        message: "Please log in to connect",
        type: "error",
      });
      return;
    }

    setConnectingUsers((prev) => ({ ...prev, [targetKey]: true }));
    setConnectionMessage({ userId: null, message: "", type: "" });

    try {
      const response = await fetch("https://qalib.cloud/api/user/connect", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetEmail: targetUser.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setConnectionMessage({
          userId: targetKey,
          message: "Connected successfully!",
          type: "success",
        });
        setTimeout(() => {
          setConnectionMessage({ userId: null, message: "", type: "" });
        }, 2000);
      } else {
        setConnectionMessage({
          userId: targetKey,
          message: data.message || data.error || "Failed to connect",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Connection error:", error);
      setConnectionMessage({
        userId: targetKey,
        message: "Error connecting. Please try again.",
        type: "error",
      });
    } finally {
      setConnectingUsers((prev) => ({ ...prev, [targetKey]: false }));
    }
  };

  return (
    <div className=" ">
      <h3 className="font-semibold mb-3">People you may know</h3>
      <div className="space-y-3">
        {siteusers.slice(0, 5).map((user) => {
          const userKey = user.id || user._id || user.email;
          return (
            <div key={userKey} className="flex items-center space-x-3 py-2">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
                {user.demographics?.gender === "Male" ? "👦🏻" : "👩🏻"}
              </div>

              {/* User info + button */}
              <div className="flex flex-col flex-1">
                <p className="text-sm font-semibold">
                  {user.fullName?.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="text-xs text-gray-500">
                  {user.cohortinformation?.programName || "N/A"}
                </p>
                <button
                  onClick={() => handleConnect(user)}
                  disabled={connectingUsers[userKey]}
                  className="mt-1 text-blue-600 text-xs font-medium hover:underline self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {connectingUsers[userKey] ? "Connecting..." : "Connect"}
                </button>
                {connectionMessage.userId === userKey && (
                  <p
                    className={`mt-1 text-xs ${connectionMessage.type === "success" ? "text-green-600" : "text-red-600"}`}
                  >
                    {connectionMessage.message}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionsPage;
