import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Lock, LogOut } from "lucide-react";
import Offer from "../../components/Offer/Offer";
import AdminHome from "../../components/Home/AdminHome";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("Users");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/register");
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6 relative">
            {/* Header */}
            <div className="w-full max-w-7xl flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    👋 Welcome Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium shadow transition"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Tabs */}
            <div className="flex  space-x-4 bg-white shadow rounded-2xl p-2 mb-8">
                <button
                    onClick={() => setActiveTab("Users")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition ${activeTab === "Users"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-600 hover:bg-blue-100"
                        }`}
                >
                    <Users size={18} />
                    Users
                </button>

                <button
                    onClick={() => setActiveTab("Admins")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition ${activeTab === "Admins"
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-600 hover:bg-blue-100"
                        }`}
                >
                    <Lock size={18} />
                    Admins
                </button>
            </div>

            {/* Content */}
            <div className="w-full max-w-7xl bg-white rounded-2xl shadow p-6">
                {activeTab === "Users" ? <AdminHome /> : <Offer />}
            </div>
        </div>
    );
}
